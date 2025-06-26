"use client";
import { fetchTrends } from "@/redux/slices/trendsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/common/container/loader/Loader";
import Trends from "@/components/trends/Trends";
import { cleanTrends } from "@/redux/slices/trendsSlice";

const page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanTrends());
    dispatch(fetchTrends());
  }, [dispatch]);

  const trends = useSelector((state) => state.trends.trends);
  const isLoading = useSelector((state) => state.trends.isLoading.fetchTrends);
  const isError = useSelector((state) => state.trends.isError.fetchTrends);
  const error = useSelector((state) => state.trends.error);

  console.log("Trends:", trends);

  if (isError) {
    return <div>{error.code}</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <Trends trends={trends} />;
};

export default page;
