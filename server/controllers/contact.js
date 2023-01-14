

import nodemailer from "nodemailer";
import dotenv from 'dotenv';
//get config vars
    dotenv.config();

// send mail
export const sendEmail = async (req ,res) =>{
    
    let { text } = req.body
	let { email } = req.body
	let { name } = req.body
	let { subject } = req.body	
    let { message } = req.body		
	
    
	const transport = nodemailer.createTransport({
		service:'gmail',
		auth:{
		  user:'murimib08@gmail.com',
		  pass:"fgpsdfeuzkfnqlgf"
  
		}
	})

	await transport.sendMail({
		from: "murimib08@gmail.com",
		to: "murimib08@gmail.com",
		subject: `${subject}`,
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 15px; 
        ">
		<h3> From ${email}!</h3>
		<h3> Name: ${name}!</h3>
        <h3>Message!</h3>
        <p>${message}</p>
    
        <p>@Mpishi</p>
         </div>
    `
	})
}
