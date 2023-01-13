
import  Sequelize  from "sequelize";
import db from "../config/config.js";
 
const { DataTypes } = Sequelize;
 
const Blogs = db.define('blogs',{
    
    blog_title:{
        type: DataTypes.STRING
    },
    blog_category:{
        type: DataTypes.STRING
    },
    blog_text:{
        type: DataTypes.STRING
    },
    blog_image:{
        type: DataTypes.STRING
    },
    feedback:{
        type: DataTypes.STRING
    }

},{
    freezeTableName: true
 });

// db.sync()
// .then(()=>{
//     console.log(' blog table created');
//
// })
export default Blogs;


