import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';

const fadeImages = [
 
       'https://thumbs.dreamstime.com/b/businessman-working-laptop-light-background-copy-space-business-remote-work-connect-online-banking-shopping-concept-121794982.jpg',
   
    ,
    
      'https://thumbs.dreamstime.com/b/hand-touching-icon-businessman-success-leadership-social-network-digital-matketing-human-resources-management-recruitment-154741969.jpg',
  
    ,
    
       'https://thumbs.dreamstime.com/b/young-woman-freelancer-indoors-home-office-concept-winter-atmosphere-blurred-background-writing-planner-smiling-young-female-108814295.jpg',
 
    ,
  ];


const Home = () => {
  const form = useRef();


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_izy9qws', 'template_nisndqp', form.current, 'qsWx1Nn--di_P6Z59')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <div>
        
        <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '90%' , height:'500px'}} src={fadeImage}></img>
     
          </div>
        ))}
      </Fade>


      <div class="vertical">
        <form ref={form} onSubmit={sendEmail}>
          <br></br>
        <label>Name</label>
        <br></br>
        <input type="text" name="from_name" />
        <br></br>
        <label>Email</label>
        <br></br>
        <input type="email" name="user_email" />
        <br></br>
        <label>Message</label>
        <br></br>
        <textarea name="message" />
        <br></br>
        <input type="submit" value="Send" />
        </form>
      </div>



    </div>
  )
}

export default Home