import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import userRouter from "./src/routes/user.route.js";
import postRouter from "./src/routes/post.route.js";
import commentRouter from "./src/routes/comment.route.js";
import connectDb from "./src/config/db.config.js";
import webhookRouter from "./src/routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import { globalLimiter } from "./src/middleware/rateLimitMiddleware.js";
import logger from "./src/logger/logger.js";

const app = express();
// connect db
await connectDb();

// checks the request cookies and headers for session JWT
// If found, attaches the Auth object to the request under the auth key
app.use(clerkMiddleware());

// Using body-parser for this route which conflicts with express.json(),
// thus this position.
app.use("/api/webhooks", webhookRouter);

// global limiter
app.use(globalLimiter);

// middleware
app.use(express.json());
// app.use(cors(corsOptions))
app.use(cors());
// compress all responses
app.use(compression());
// secure http response headers
app.use(helmet());

// endpoints
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.get("/", (_, res) => {
  res.send("API working 😘");
});

// Error handler. Must be defined last after other app.use.
app.use((err, req, res, next) => {
  console.error(err);
  logger.error(`${err.name}: ${err.status} - ${err.message}`);
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message || "Something went wrong!",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is runnining on port ${PORT}`);
});
