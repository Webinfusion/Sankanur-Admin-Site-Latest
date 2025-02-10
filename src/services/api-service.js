import axios from 'axios';

// Create a base Axios instance (no baseURL to avoid localhost:3000 issues)
const api = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET Request
export const apiGet = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET Error:', error);
    return [];
  }
};

// POST Request
export const apiPost = async (url, data = {}, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error('POST Error:', error);
    return []
  }
};
