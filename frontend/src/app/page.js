"use client";
import { useUser } from "@clerk/nextjs";
import Welcome from "@/components/welcome/Welcome";
import TopTrends from "@/components/topTrends/TopTrends";
import Features from "@/components/features/Features";
import { mirrorUser } from "@/lib/clerk/mirrorData";
import PrevJoined from "@/components/prevJoined/PrevJoined";

const page = () => {
  const { isSignedIn, user } = useUser();

  if (isSignedIn && user) {
    mirrorUser(user);
  }

  return (
    <div>
      <Welcome isSignedIn={isSignedIn} user={user} />
      <TopTrends />
      {isSignedIn ? <PrevJoined /> : <Features />}
    </div>
  );
};

export default page;
