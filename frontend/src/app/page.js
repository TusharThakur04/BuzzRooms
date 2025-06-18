"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";

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
        username: user.username,
        image: user.imageUrl,
      };

      console.log("Mirroring user:", userPayload);

      // // Send user data to your Express backend
      // await axios.post("http://localhost:8000/api/mirror-user", userPayload, {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`, // if your backend validates Clerk tokens
      //   // },
      // });

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

  return <div>Hey Sign up</div>;
};

export default page;
