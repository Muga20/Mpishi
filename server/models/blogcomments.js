import Sequelize from "sequelize";
import db from "../config/config.js";
import Blogs from "./blog.js";
import Members from "./members.js";

const { DataTypes } = Sequelize;

const BlogsComment = db.define(
  'blog-comment',{

  comment_text:{
    type: DataTypes.TEXT
  }, 
  member_id:{
    type: DataTypes.INTEGER
  },
  blog_id:{
    type: DataTypes.INTEGER
  },
},{
  freezeTableName: true
});

BlogsComment .belongsTo(Members,{
  foreignKey:'member_id'
});


BlogsComment.belongsTo(Blogs, {
  foreignKey: 'blog_id',
});

Members.hasMany(BlogsComment, {
  foreignKey: 'blog_id',
});

Blogs .hasMany(BlogsComment, {
  foreignKey: 'blog_id',
});


db.sync().then(() => {
    console.log(' BlogsComment table created');
  });

export default  BlogsComment;
