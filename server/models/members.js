import  Sequelize  from "sequelize";
import db from "../config/config.js";
 
const { DataTypes } = Sequelize;
 
const Members = db.define('members',{

   
    first_name:{
        type: DataTypes.STRING
    },
    last_name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    phone :{
        type: DataTypes.STRING
    },
    gender:{
        type: DataTypes.STRING
    },
    role:{
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
      },  
    image:{
        type:DataTypes.STRING,
        default:true
    },
    username:{
        type:DataTypes.STRING,
        default:true
    },
  

   
},{
    freezeTableName: true
});




db.sync()
.then(()=>{
    console.log(' member table created');

})
export default Members;


