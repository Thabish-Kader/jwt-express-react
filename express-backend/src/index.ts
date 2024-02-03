import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import { PORT } from "@/constants";
import { dbConnection, disconnectDB } from "@/config/db";
import router from "@/route/routes";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "@/middleware/errorMiddleware";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1", router);

// Video on Error handling : https://youtu.be/UVAMha41dwo?si=Y8l_GoJNgf9OJiUH
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Listening on port ${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing database connection...");
  await disconnectDB();
  process.exit(0);
});
