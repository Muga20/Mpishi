import Sequelize from "sequelize";
import db from "../config/config.js";
import Members from "./members.js";

const { DataTypes } = Sequelize;

const Recipe = db.define(
  "recipes",
  {
    name: {
      type: DataTypes.STRING,
    },
    cat_id: {
      type: DataTypes.INTEGER,
    },
    member_id: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.TEXT,
    },
    steps: {
      type: DataTypes.TEXT,
    },
    cook_time: {
      type: DataTypes.STRING,
    },
    about_the_recipe: {
      type: DataTypes.TEXT,
    },
    serves: {
      type: DataTypes.STRING,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Recipe.belongsTo(Members, { foreignKey: "member_id" });

//db.sync()

export default Recipe;
