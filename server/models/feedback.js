
import  Sequelize  from "sequelize";
import db from "../config/config.js";
import Members from "./members.js";
const { DataTypes } = Sequelize;
 
const FeedBack = db.define(
    'feedback',{

    member_id:{
        type: DataTypes.INTEGER
    },
    message:{
        type: DataTypes.STRING
    },
    image:{
        type:DataTypes.STRING,
        default:true
    },
   
},{
    freezeTableName: true
});

FeedBack .belongsTo(Members,{
    foreignKey:'member_id'
});


db.sync()
.then(()=>{
    console.log(' feedback table created');

})
export default FeedBack;


