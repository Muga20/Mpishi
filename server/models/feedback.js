
import  Sequelize  from "sequelize";
import db from "../config/config.js";
import Members from "./members.js";
const { DataTypes } = Sequelize;
import Response from "./response.js";
 
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

Members.hasMany(FeedBack,{
    foreignKey:'member_id'
});

FeedBack.hasMany(Response,{
    foreignKey:'feedback_id'
});

Response.belongsTo(FeedBack,{
    foreignKey:'feedback_id'
});








db.sync()
.then(()=>{
    console.log(' feedback table created');

})
export default FeedBack;


