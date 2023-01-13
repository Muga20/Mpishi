import  Sequelize from "sequelize";
import db from "../config/config.js";
import Members from "./members.js";
import Recipe from "./recipe.js";

const { DataTypes } = Sequelize;

 
const Comments = db.define(
    'comments',{
    text:{
        type: DataTypes.STRING
    }, 
    member_id:{
        type: DataTypes.INTEGER
    },
        recipe_id:{
            type: DataTypes.INTEGER
        },
},{
    freezeTableName: true
});


Comments.belongsTo(Members,{foreignKey:'member_id'});
Comments.belongsTo(Recipe,{foreignKey:'recipe_id'});


db.sync()
.then(()=>{
    console.log(' Comments table created');

})

export default  Comments;


