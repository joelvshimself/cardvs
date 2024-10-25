import { createStore } from 'vuex';
import { throttledApiCall } from '../services/apiService';

export default createStore({
  state: {
    cards: [],
    cardDetailsCache: {},
    selectedCardsForComparison: [],
    cardImages: {},
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
      cards.forEach((card) => {
        state.cardDetailsCache[card.cardKey] = card;
      });
    },
    CACHE_CARD_DETAIL(state, { cardKey, cardDetail }) {
      state.cardDetailsCache = {
        ...state.cardDetailsCache,
        [cardKey]: cardDetail,
      };
    },
    SET_CARD_IMAGE(state, { cardKey, cardImageUrl }) {
      state.cardImages = {
        ...state.cardImages,
        [cardKey]: cardImageUrl,
      };
    },
    ADD_CARD_TO_COMPARISON(state, cardKey) {
      if (
        !state.selectedCardsForComparison.includes(cardKey) &&
        state.selectedCardsForComparison.length < 3
      ) {
        state.selectedCardsForComparison.push(cardKey);
      }
    },
    REMOVE_CARD_FROM_COMPARISON(state, cardKey) {
      state.selectedCardsForComparison = state.selectedCardsForComparison.filter(
        (key) => key !== cardKey
      );
    },
    CLEAR_COMPARISON(state) {
      state.selectedCardsForComparison = [];
    },
  },
  actions: {
    initializeStore({ commit }) {
      const savedComparison = JSON.parse(localStorage.getItem('selectedCardsForComparison'));
      if (savedComparison && Array.isArray(savedComparison)) {
        savedComparison.forEach((cardKey) => {
          commit('ADD_CARD_TO_COMPARISON', cardKey);
        });
      }
    },
    async searchCards({ commit }, searchTerm) {
      try {
        const response = await throttledApiCall(
          `creditcard-detail-namesearch/${encodeURIComponent(searchTerm)}`
        );

        const cards = response.data;

        if (!cards || cards.length === 0) {
          commit('SET_CARDS', []);
          return;
        }

        const detailedCardsPromises = cards.map((card) =>
          throttledApiCall(`creditcard-detail-bycard/${encodeURIComponent(card.cardKey)}`)
        );

        const detailedCardsResults = await Promise.allSettled(detailedCardsPromises);

        const detailedCards = detailedCardsResults
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value.data[0]);

        commit('SET_CARDS', detailedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
        commit('SET_CARDS', []);
      }
    },
    async fetchCardImage({ commit, state }, cardKey) {
      if (state.cardImages[cardKey]) return;

      // Removed the HEAD request to avoid 404 errors in the console
      const imageUrl = `https://rewards-credit-card-api.p.rapidapi.com/creditcard-card-image/${encodeURIComponent(
        cardKey
      )}`;

      commit('SET_CARD_IMAGE', { cardKey, cardImageUrl: imageUrl });
    },
    async addCardToComparison({ commit, state, dispatch }, cardKey) {
      if (!state.cardDetailsCache[cardKey]) {
        await dispatch('fetchCardDetail', cardKey);
      }
      commit('ADD_CARD_TO_COMPARISON', cardKey);
      localStorage.setItem(
        'selectedCardsForComparison',
        JSON.stringify(state.selectedCardsForComparison)
      );
    },
    async fetchCardDetail({ commit, state }, cardKey) {
      if (state.cardDetailsCache[cardKey]) {
        return state.cardDetailsCache[cardKey];
      }

      try {
        const response = await throttledApiCall(
          `creditcard-detail-bycard/${encodeURIComponent(cardKey)}`
        );
        const cardDetail = response.data[0];
        commit('CACHE_CARD_DETAIL', { cardKey, cardDetail });
        return cardDetail;
      } catch (error) {
        console.error(`Error fetching details for card ${cardKey}:`, error);
        return null;
      }
    },
    removeCardFromComparison({ commit, state }, cardKey) {
      commit('REMOVE_CARD_FROM_COMPARISON', cardKey);
      localStorage.setItem(
        'selectedCardsForComparison',
        JSON.stringify(state.selectedCardsForComparison)
      );
    },
    clearComparison({ commit }) {
      commit('CLEAR_COMPARISON');
      localStorage.removeItem('selectedCardsForComparison');
    },
  },
  getters: {
    getCardByKey: (state) => (cardKey) => {
      return state.cardDetailsCache[cardKey];
    },
    getCardImage: (state) => (cardKey) => {
      return state.cardImages[cardKey];
    },
    comparisonCards: (state, getters) => {
      return state.selectedCardsForComparison
        .map((cardKey) => getters.getCardByKey(cardKey))
        .filter((card) => card != null);
    },
  },
});