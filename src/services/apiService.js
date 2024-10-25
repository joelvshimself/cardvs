import axios from 'axios';

const apiBaseUrl = 'https://rewards-credit-card-api.p.rapidapi.com';
const apiKey = process.env.VUE_APP_RAPIDAPI_KEY;
const apiHost = process.env.VUE_APP_RAPIDAPI_HOST;

const requestQueue = [];
let isProcessing = false;

const REQUEST_DELAY = 350; // 350ms for 3 requests per second

// Process the next request in the queue
const processQueue = () => {
  if (requestQueue.length === 0) {
    isProcessing = false;
    return;
  }

  isProcessing = true;
  const { endpoint, method, params, resolve, reject } = requestQueue.shift();

  axios({
    method,
    url: `${apiBaseUrl}/${endpoint}`,
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost,
    },
    ...params,
  })
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.warn(`Resource not found (${endpoint}): 404 Not Found`);
        } else {
          console.error(`API Call Error (${endpoint}):`, error);
        }
        reject(error);
      })
    .finally(() => {
      // Wait for REQUEST_DELAY before processing the next request
      setTimeout(() => {
        processQueue();
      }, REQUEST_DELAY);
    });
};

// Exported function to enqueue API requests
export function throttledApiCall(endpoint, method = 'GET', params = {}) {
  return new Promise((resolve, reject) => {
    requestQueue.push({ endpoint, method, params, resolve, reject });
    if (!isProcessing) {
      processQueue();
    }
  });
}