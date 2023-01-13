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
