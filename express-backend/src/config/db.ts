import { SQLITE_DB, SQLITE_PASSWORD, SQLITE_USER } from "@/constants";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(SQLITE_DB, SQLITE_USER, SQLITE_PASSWORD, {
  host: SQLITE_PASSWORD,
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: true,
});

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const disconnectDB = async () => {
  try {
    await sequelize.close();
    console.log("Connection has been closed successfully.");
  } catch (error) {
    console.error("Error closing the database connection:", error);
  }
};

export default sequelize;
