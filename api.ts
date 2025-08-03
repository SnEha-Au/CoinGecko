import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

export const fetchMarkets = async (page = 1, perPage = 50) => {
  const res = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: false,
    },
    headers: {
      'x-cg-demo-api-key': API_KEY,
    },
  });
  return res.data;
};

export const fetchCoinMarketChart = async (id: string, days = '7') => {
  const res = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days,
    },
    headers: {
      'x-cg-demo-api-key': API_KEY,
    },
  });
  return res.data;
};

export const fetchCoinDetails = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/coins/${id}`, {
    headers: {
      'x-cg-demo-api-key': API_KEY,
    },
  });
  return res.data;
};
