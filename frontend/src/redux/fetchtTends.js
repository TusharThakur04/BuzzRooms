import axios from "axios";

export const fetchTrends = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trends`, {});
  console.log(
    process.env.NEXT_PUBLIC_API_URL,
    "API URL used for fetching trends"
  );

  // console.log("Trends fetched:", res.data);
  return res.data;
};

export const fetch = {
  fetchTrends,
};
