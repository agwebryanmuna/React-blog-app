import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { corsOptions } from "./src/config/cors.config.js";
import userRouter from "./src/routes/userRoute.js";
import postRouter from "./src/routes/postRoute.js";
import commentRouter from "./src/routes/commentRouter.js";
import connectDb from "./src/config/db.config.js";

const app = express();

// middleware
app.use(express.json());
// app.use(cors(corsOptions))
app.use(cors())
// compress all responses
app.use(compression());
// secure http response headers
app.use(helmet());

// connect db
await connectDb()

// Users endpoint
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

app.get("/", (_, res) => {
  res.send("API working 😘");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is runnining on port ${PORT}`);
});
