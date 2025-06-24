"use client";
import { fetchTrends } from "@/redux/slices/trendsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrends());
  }, [dispatch]);

  const trends = useSelector((state) => state.trends.trends);
  console.log("Trends:", trends);

  return <div>page</div>;
};

export default page;
