import axios from "axios";

export const mirrorUser = async (user) => {
  try {
    const userPayload = {
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress || "",
      username: user.firstName,
      image: user.imageUrl,
    };

    console.log("Mirroring user:", userPayload);

    // Send user data to your Express backend
    await axios.post("http://localhost:8000/login/", userPayload);
  } catch (error) {
    console.error("Failed to mirror user:", error);
  }
};
