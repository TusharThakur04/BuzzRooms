"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";
import Welcome from "@/components/welcome/Welcome";
import TopTrends from "@/components/topTrends/TopTrends";
import Features from "@/components/features/Features";

const page = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const mirrorUser = async () => {
    try {
      // Get Clerk token from your API route
      // const tokenRes = await axios.get("/api/token");
      // const token = tokenRes.data.token;

      // Build the user data payload
      const userPayload = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        username: user.firstName,
        image: user.imageUrl,
      };

      console.log("Mirroring user:", userPayload);

      // Send user data to your Express backend
      await axios.post("http://localhost:8000/login/", userPayload);

      // console.log("User mirrored successfully");
    } catch (error) {
      console.error("Failed to mirror user:", error);
    }
  };

  if (isSignedIn && user) {
    mirrorUser();
    return <div>Welcome, {user?.username || user?.firstName}!</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Welcome />
      <TopTrends />
      <Features />
    </div>
  );
};

export default page;
