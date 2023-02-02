import Sequelize from "sequelize";
import db from "../config/config.js";
import Members from "./members.js";

const { DataTypes } = Sequelize;

const Blogs = db.define(
  "blogs",
  {
    blog_title: {
      type: DataTypes.TEXT,
    },
    blog_category: {
      type: DataTypes.STRING,
    },
    blog_text: {
      type: DataTypes.TEXT,
    },
    blog_image: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Blogs.belongsTo(Members, {
  foreignKey: "user_id",
});

Members.hasMany(Blogs, {
  foreignKey: "user_id",
});



db.sync().then(() => {
  console.log("Blog table created");
});

export default Blogs;
