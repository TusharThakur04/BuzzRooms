import prisma from "../lib/prisma.js";

const fetchPrevMsgs = async (room) => {
  try {
    const messages = await prisma.messages.findMany({
      where: { room },
      orderBy: { timestamp: "asc" },
      select: {
        content: true,
        timestamp: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    console.log("Fetched messages:", messages);
    return messages;
  } catch (error) {
    console.error("Error fetching previous messages:", error);
  }
};

export default fetchPrevMsgs;
