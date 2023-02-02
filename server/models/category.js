
import  Sequelize  from "sequelize";
import db from "../config/config.js";
import Recipe from "./recipe.js";


 
const { DataTypes } = Sequelize;
 
const Category = db.define(
    'category',{

    name:{
        type: DataTypes.STRING   
    },
    image:{
        type: DataTypes.STRING
    },
   
},{
    freezeTableName: true
});

Category.hasMany(Recipe,{
    foreignKey:'cat_id',
    as:'recipes'
});

Recipe.belongsTo(Category,{
    foreignKey:'cat_id'
});


db.sync()
.then(()=>{
    console.log(' category table created');

})



export default Category;


