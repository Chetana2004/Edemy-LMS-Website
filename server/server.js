// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/mongodb.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import userRouter from "./routes/userRoutes.js";
// import { clerkMiddleware } from "@clerk/express";
// import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
// import educatorRouter from "./routes/educatorRoutes.js";
// import courseRouter from "./routes/courseRoute.js";

// // Initialize Express
// const app = express();

// // ✅ CORS middleware (must come first)
// const corsOptions = {
//   origin: "https://edemyclient.onrender.com",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// // ✅ Explicitly handle preflight requests
// app.options("*", cors(corsOptions));

// // Connect to database & cloud
// await connectDB();
// await connectCloudinary();

// // ✅ Now apply clerk and JSON middlewares
// app.use(clerkMiddleware());

// // ✅ Body parsers (JSON & raw)
// app.use(express.json()); // for regular routes
// app.use("/stripe", express.raw({ type: "application/json" })); // for Stripe raw payload

// // Routes
// app.get("/", (req, res) => res.send("API Working"));
// app.post("/clerk", clerkWebhooks);
// app.post("/stripe", stripeWebhooks);
// app.use("/api/educator", educatorRouter);
// app.use("/api/course", courseRouter);
// app.use("/api/user", userRouter);

// // Port
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });















import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import courseRouter from "./routes/courseRoute.js";

// Initialize Express
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

// ✅ Apply CORS before any other middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight handling

// ✅ Connect to DB and cloud
await connectDB();
await connectCloudinary();

// ✅ Clerk and body parsers
app.use(clerkMiddleware());
app.use(express.json()); // JSON parser
app.use("/stripe", express.raw({ type: "application/json" })); // Stripe webhooks need raw

// ✅ Routes
app.get("/", (req, res) => res.send("API Working"));
app.post("/clerk", clerkWebhooks);
app.post("/stripe", stripeWebhooks);
app.use("/api/educator", educatorRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
