import React from 'react'
import '../resources/css/contact.css'
import Footer from '../Views/Footer';
import Navbar from "../Views/Navbar";
import axios from "axios"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ContactUs() {

	const [ sent, setSent ] = useState(false)
	const [ email, setEmail ] = useState("")
	const [ name, setName ] = useState("")
	const [ subject, setSubject ] = useState("")
	const [ message, setMessage ] = useState("")


	const handleSend = async (e) => {
		e.preventDefault()
		toast.success("Comment created successfully");
		try {
			await axios.post("http://localhost:5000/contact", {
				name,
				email,
				subject,
				message

			})
		
		} catch (error) {
			console.error(error)
			toast.error("Failed to send message");
		}
	}

  return (
    <div>
    <Navbar />
	
	<form onSubmit={handleSend}>
    <div className='contact-B'>
    	<div class="container-c">
		<div class="contact-box">
			<div class="left"></div>
			<div class="right">
				<h2 className='contact-h2'>Get in touch</h2>
				<input type="text" value={name} onChange={(e) => setName(e.target.value)}  class="field"  required placeholder="Your Name"/>
				<input type="text"  value={email} onChange={(e) => setEmail(e.target.value)} class="field"  required  placeholder="Your Email"/>
				<input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}  class="field" required  placeholder="Subject"/ >
				<textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} class="field"></textarea>
				<button type="submit" class="btn-n">Send</button>
			</div>
		</div>
	</div>
    </div>
	
	</form>


	<ToastContainer
position="top-center"
autoClose={2200}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>	
    <Footer/>
    </div>
  )
}

export default ContactUs

