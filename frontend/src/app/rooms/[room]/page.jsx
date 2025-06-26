"use client";
import React from "react";
import { useParams } from "next/navigation";

const page = () => {
  const { room } = useParams();

  return <div>{decodeURIComponent(room)}</div>;
};

export default page;
