import prisma from "../lib/prisma.js";

export const mirrorUserToDB = async (req, res) => {
  try {
    const { clerkId, email, username, image } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //mirror user to DB
    let user = await prisma.user.findUnique({ where: { clerkId } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          username,
          image,
        },
      });
      console.log("user stored:", user.username);
    } else {
      console.log("user exists:", user.username);
    }
    // Now `user` is always defined

    return res.status(200).json({ message: "User mirrored", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
