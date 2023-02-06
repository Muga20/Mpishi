
import  Sequelize  from "sequelize";
import db from "../config/config.js";
import FeedBack from "./feedback.js";
import Members from "./members.js";
const { DataTypes } = Sequelize;
 
const Response = db.define(
    'response',{

    member_id:{
        type: DataTypes.INTEGER
    },
    message:{
        type: DataTypes.STRING
    },
   feedback_id:{
        type: DataTypes.INTEGER
    }, 
},{
    freezeTableName: true
});

Response .belongsTo(Members,{
    foreignKey:'member_id'
});

Members.hasMany(Response,{
    foreignKey:'member_id'
});













db.sync()
.then(()=>{
    console.log(' Response table created');

})
export default Response;


