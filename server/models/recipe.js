import  Sequelize from "sequelize";
import db from "../config/config.js";
import Category from"./category.js"

 
const { DataTypes } = Sequelize;

 
const Recipe = db.define(
    'recipes',{
    name:{
        type: DataTypes.STRING
    }, 
    cat_id:{
        type: DataTypes.INTEGER
    },
    image:{
        type: DataTypes.STRING
    },
    ingredients:{
        type: DataTypes.TEXT
    },
    steps:{
        type: DataTypes.TEXT
    },
    cook_time:{
        type: DataTypes.STRING
    },
    about_the_recipe:{
        type: DataTypes.TEXT
    },
    serves :{
        type: DataTypes.STRING
    },
  
},{
    freezeTableName: true
});


Category.hasMany(Recipe,{
    foreignKey:'cat_id',
    as: 'recipe'
});

Recipe.belongsTo(Category,{
    foreignKey:'cat_id',
    as:'recipe'
});




db.sync()
.then(()=>{
    console.log(' recepis table created');

})

export default Recipe;


