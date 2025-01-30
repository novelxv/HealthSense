import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAirQuality = async (city) => {
  const response = await axios.get(`${API_URL}/health/${city}`);
  return response.data;
};

export const getGraphData = async (city, period) => {
  const response = await axios.get(`${API_URL}/graph/${city}/${period}`);
  return response.data;
};

export const getArticles = async (location) => {
  const response = await axios.get(`${API_URL}/education?location=${location}`);
  return response.data;
};