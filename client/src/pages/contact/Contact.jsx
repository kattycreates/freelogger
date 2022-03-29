import React from 'react'
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import './contact.css';
const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const USER_ID = process.env.REACT_APP_USER_ID;

const Contact = () => {
    const handleOnSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
          .then((result) => {
            console.log(result.text);
            Swal.fire({
              icon: 'success',
              title: 'Message Sent Successfully'
            })
          }, (error) => {
            console.log(error.text);
            Swal.fire({
              icon: 'error',
              title: 'Ooops, something went wrong',
              text: error.text,
            })
          });
        e.target.reset()
      };
    return (
        <div id="contact">
            <div className="title">
                <h1>Contact me</h1>
            </div>
            <div className="form">
                <form action="" onSubmit={handleOnSubmit}>
                    <label htmlFor="name">Your Name<sup>*</sup></label>
                    <input type="text" id="name" name="name" required />
            
                    <label htmlFor="email"> your E-mail<sup>*</sup></label>
                    <input type="email" id="email" name="email" required />
            
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" placeholder="Enter your message here!"></textarea>
                    <button type="submit" id='button' value="Send" >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact
