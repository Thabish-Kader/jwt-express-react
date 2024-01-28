import sequelize from "@/config/db";
import { Sequelize, DataTypes } from "sequelize";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.sync();

export default User;
