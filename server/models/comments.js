import Sequelize from "sequelize";
import db from "../config/config.js";
import Members from "./members.js";
import Recipe from "./recipe.js";

const { DataTypes } = Sequelize;

const Comments = db.define(
  "comments",
  {
    text: {
      type: DataTypes.STRING,
    },
    member_id: {
      type: DataTypes.INTEGER,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Comments.belongsTo(Members, { foreignKey: "member_id" });

Comments.belongsTo(Recipe, { foreignKey: "recipe_id" });

Recipe.hasMany(Comments, { foreignKey: "recipe_id" });

Members.hasMany(Comments, { foreignKey: "member_id" });

//db.sync()

export default Comments;
