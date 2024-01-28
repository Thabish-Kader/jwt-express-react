import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;

export const SQLITE_HOST = process.env.SQLITE_HOST || "0.0.0.0";
export const SQLITE_USER = process.env.SQLITE_USER || "thabish";
export const SQLITE_PASSWORD = process.env.SQLITE_PASSWORD || "topsecret";
export const SQLITE_DB = process.env.SQLITE_DB || "database";
