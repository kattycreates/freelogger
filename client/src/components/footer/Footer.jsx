import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <h3 className='contact'>Contact me on</h3>
        <h4>Website</h4>
        <a className='website' href='https://karthika-selvam.netlify.app/'>https://karthika-selvam.netlify.app/</a>
        <h4>Socials</h4>
        <div className="footerIcons">
    
            <a href='https://www.linkedin.com/in/karthika-s-825073223/'><i className="footerIcon fab fa-linkedin fa-lg"></i></a>
            <a href='https://www.instagram.com/mauvflora/'><i className="footerIcon fab fa-instagram-square fa-lg"></i></a>
            <a href='https://twitter.com/kattycreates'><i className="footerIcon fab fa-twitter-square fa-lg"></i></a>

        </div>
        <p>&copy; Karthika Selvam 2022</p>
        <p>Made with Love &hearts;</p>
    </div>
  )
}

export default Footer