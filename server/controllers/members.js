import Members from "../models/members.js";
import dotenv from 'dotenv';
//get config vars
    dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createToken = (id,first_name,last_name,email,role) => {
 return jwt.sign({
  id:id,
  first_name:first_name,
  last_name:last_name,
  email:email,
     role:role

},process.env.TOKEN_SECRET,{expiresIn:'2d'})
}


export const getAllMembers = async (req, res) => {
  try {
    const listAllMembers = await Members.findAll();
    res.json(listAllMembers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getMembersById = async (req, res) => {
  try {
    const getAllById = await Members.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(getAllById[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const createMembers = async (req, res) => {

  const listExample = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

  const { first_name, last_name, email, password, role} = req.body;

  const UserEmail = await Members.findOne({ where: { email: email } });

  if (first_name.length ===0 || first_name.length ===0 || email.length ===0 || password.length <= 4){
    return res.sendStatus(403)
  }

  if(UserEmail){return res.sendStatus(401)}

  if (!listExample.test(email)) { return res.sendStatus(402)}

  else{
  const salt = await bcrypt.genSalt(10);
  bcrypt.hash(password, salt).then((hash) =>{
    try {
       const memnber=  Members.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hash,
        role: role,
        //  image: req.file.path,
      });
      const token = createToken(
        memnber.id
      )
      res.json({
          email,token
        // message: "User Successfully created",
      });
    } catch (err) {
      if (err) {
        res.status(400).json({ error: err });
      }
    }
  });
}
}
  


export const logInMembers = async (req, res) => {

  const { email, password } = req.body;

  const user = await Members.findOne({ where: { email: email } });

   if (!user)  return res.sendStatus(400);
   

  const dbPassword = user.password;

  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
       return res.sendStatus(401)
      // res 
      //   .json({ error: "Wrong Username and Password Combination!" });
     //   console.log("logInMembers");
    } else {

      const token = createToken(
        
        user.id,
        user.first_name,
        user.last_name,
        user.email,
          user.role

        )
      res.status(200).json({ user, token })
    }
  });
};



export const updateMembers = async (req, res) => {

  const { first_name, last_name, email, password, role} = req.body;
  
  let id = req.params.id
  const salt = await bcrypt.genSalt(10);
  bcrypt.hash(password, salt).then((hash) =>{

      let update = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hash,
        role: role,
        image: req.file.path,
  
      }  
      try {
          const updt = Members.update(update ,{where: {id: id }})
          res.status(200).send(updt)
      } catch (error) {
          res.json({ message: error.message });
      }

    })
    
  
}




export const deleteMembers = async (req, res) => {
  try {
    await Members.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "User Successfully Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};



const forgotPassword = async(req,res)=>{
  const { email} = req.body;
  
  try {
    if (!email ) {
      return res.status(40).json({
        success: false,
        message: "Email Does Not Exist",
      });
    }
      
    const user = await User.findOne({ where: { email: email } });
    if(!user){
      res.status(404).json({msg:'email does not  exists'})
      
    }else{
    //create a nodeMailer Transport
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'ma07041705@gmail.com',
        pass:"uagrmlhtgykwbrrr"

      }
    })
    //email option 
    const mailOption={
      // from:'brian@gmail.com',
      to:`${user.email}`,
      subject:"Forgot password link",
      html:'<p>You requested for reset password, You have this email because you have request to recover your account Click on the following link bellow to proceed the link will expire in 5 min <a href="http://localhost:3000/resetPassword/' + user.id + '">Forgot Password</a> if you did not request this please ignore this email and your password will remain the same</p>'
    }
    
    transporter.sendMail(mailOption,(err ,response)=>{
      if(err){
        console.log('There was an error',err);
      }else{
        console.log('There was a response ',response);
        res.status(200).json('recovery email sent ')
      }
     })
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }

}

const resetPassword =async(req,res)=>{
  const { password ,confirm_password} = req.body;
  const encryptPassword = await bcrypt.hash(password, 10);

  if(password === confirm_password){
    console.log("f")
  }else{
    return res.status(400).json({
      success: false,
      message: "Password Does Not Much",
    });
  }

  try {
    const updatedUser = await User.update({password: encryptPassword}, { where: { id: req.params.id}})
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
}
