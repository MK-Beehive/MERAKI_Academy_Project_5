import React from 'react'
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
  return (
    <div>
        
        <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '90%' , height:'500px'}} src={fadeImage}></img>
     
          </div>
        ))}
      </Fade>




    </div>
  )
}

export default Home