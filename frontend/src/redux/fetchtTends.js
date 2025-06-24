import axios from "axios";

export const fetchTrends = async () => {
  const res = await axios.get(`http://localhost:8000/trends`, {});

  // console.log("Trends fetched:", res.data);
  return res.data;
};

export const fetch = {
  fetchTrends,
};
