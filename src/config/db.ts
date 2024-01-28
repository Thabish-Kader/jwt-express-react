import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "thabish", "topsecret", {
  host: "0.0.0.0",
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
