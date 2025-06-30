import prisma from "../lib/prisma.js";
const storeMsg = async (message, clerkId) => {
  if (!message || !clerkId) {
    console.error("Missing required fields: message or clerkId");
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      console.error("User not found for clerkId:", clerkId);
      return;
    }

    const newMessage = await prisma.messages.create({
      data: {
        content: message,
        userId: user.id,
      },
    });
    console.log("Message stored:", newMessage);
    return;
  } catch (error) {
    console.error("Error storing message:", error);
  }
};

export default storeMsg;
