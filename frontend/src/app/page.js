"use client";
import { useUser } from "@clerk/nextjs";

import Welcome from "@/components/welcome/Welcome";
import TopTrends from "@/components/topTrends/TopTrends";
import Features from "@/components/features/Features";
import { mirrorUser } from "@/lib/clerk/mirrorData";

const page = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (isSignedIn && user) {
    mirrorUser(user);
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
