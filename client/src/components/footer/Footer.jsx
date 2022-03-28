import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <h3 className='contact'>Contact me on</h3>
        <p>Website: <a className='website' href='https://karthika-selvam.netlify.app/'>https://karthika-selvam.netlify.app/</a></p>
        <h4>Socials</h4>
        <div className="footerIcons">
            <i className="footerIcon fab fa-linkedin fa-lg"></i>
            <i className="footerIcon fab fa-instagram-square fa-lg"></i>
            <i className="footerIcon fab fa-twitter-square fa-lg"></i>

        </div>
        <p>&copy; Karthika Selvam 2022</p>
        <p>Made with Love &hearts;</p>
    </div>
  )
}

export default Footer