import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import { PORT } from "@/constants";
import { dbConnection, disconnectDB } from "@/config/db";
import router from "@/route/routes";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "@/middleware/errorMiddleware";

const app = express();

app.use(cors());
app.use(json());
app.use(morgan("dev"));

app.use("/api/v1", router);

// Error handling
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