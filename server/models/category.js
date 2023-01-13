
import  Sequelize  from "sequelize";
import db from "../config/config.js";


 
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




db.sync()
.then(()=>{
    console.log(' category table created');

})



export default Category;


