import { Router } from "express";
import { mirrorUserToDB } from "../controllers/dataMirror.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Send Post req to login/signup");
});
router.post("/", mirrorUserToDB);

export default router;

// // POST: Mirror user to DB
// router.post("/", async (req, res) => {
//   try {
//     const { clerkId, email, username, image } = req.body;

//     if (!clerkId || !email) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Upsert: create if doesn't exist, do nothing if already exists
//     const user = await prisma.user.upsert({
//       where: { clerkId },
//       update: {}, // can include updates later if needed
//       create: {
//         clerkId,
//         email,
//         username,
//         image,
//       },
//     });

//     return res.status(200).json({ message: "User mirrored", user });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;
