"use client";
import { useUser, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import Welcome from "@/components/welcome/Welcome";
import TopTrends from "@/components/topTrends/TopTrends";
import Features from "@/components/features/Features";
import { mirrorUser } from "@/lib/clerk/mirrorData";
import PrevJoined from "@/components/prevJoined/PrevJoined";
import { BeatLoader } from "react-spinners";

const page = () => {
  const { isSignedIn, user } = useUser();

  if (isSignedIn && user) {
    mirrorUser(user);
  }

  return (
    <>
      <ClerkLoading>
        <div
          style={{ minHeight: "100vh" }}
          className="flex justify-center align items-center"
        >
          <BeatLoader color="#ebe2ec" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <div>
          <Welcome isSignedIn={isSignedIn} user={user} />
          <TopTrends />
          {isSignedIn ? <PrevJoined /> : <Features />}
        </div>
      </ClerkLoaded>
    </>
  );
};

export default page;
