import axios from "axios";

export const fetchTrends = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trends`, {});

  // console.log("Trends fetched:", res.data);
  return res.data;
};

export const fetch = {
  fetchTrends,
};
