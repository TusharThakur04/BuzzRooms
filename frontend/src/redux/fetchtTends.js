import axios from "axios";

export const fetchTrends = async () => {
  const res = await axios.get(`http://localhost:8000/trends`, {});
  return res.data;
};

export const fetch = {
  fetchTrends,
};
