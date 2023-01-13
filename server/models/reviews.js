import  Sequelize from "sequelize";
import db from "../config/config.js";
import Members from "./members.js";

const { DataTypes } = Sequelize;

 
const Reviews = db.define(
    'reviews',{
    text:{
        type: DataTypes.STRING
    }, 
    rating:{
        type: DataTypes.INTEGER
    },
    member_id:{
        type: DataTypes.INTEGER
    },
},{
    freezeTableName: true
});

Reviews.belongsTo(Members,{foreignKey:'member_id'});



db.sync()
.then(()=>{
    console.log(' Reviews  table created');

})

export default Reviews;


