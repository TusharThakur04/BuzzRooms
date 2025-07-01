import prisma from "../lib/prisma.js";

const msgCleanup = async (trendingRooms) => {
  try {
    const rooms = await prisma.messages.findMany({
      distinct: ["room"], // ✅ Only unique room names
      select: {
        room: true,
      },
    });
    const dbRooms = rooms.map((r) => r.room);
    console.log("Rooms fetched for cleanup:", dbRooms);
    const trendingRoomNames = trendingRooms.map((r) => r.name);
    const staleRooms = dbRooms.filter(
      (room) => !trendingRoomNames.includes(room)
    );

    if (staleRooms.length === 0) {
      console.log("no stale rooms to clean up.");
      return;
    }
    const deleted = await prisma.messages.deleteMany({
      where: {
        room: {
          in: staleRooms,
        },
      },
    });
    console.log(`🧹 Deleted ${deleted.count} messages from stale rooms`);
  } catch (error) {
    console.error("Error during message cleanup:", error);
  }
};
export default msgCleanup;
