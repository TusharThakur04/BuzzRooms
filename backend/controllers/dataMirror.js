import prisma from "../lib/prisma.js";

export const mirrorUserToDB = async (req, res) => {
  try {
    const { clerkId, email, username, image } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //mirror user to DB
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {},
      create: {
        clerkId,
        email,
        username,
        image,
      },
    });

    console.log("user stored:", username);
    return res.status(200).json({ message: "User mirrored", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
