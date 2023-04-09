import axios from 'axios'
import React ,{useEffect,useState} from 'react'
import "./freelancer.css"



const Freelancer = () => {

const [resultinfo, setresultinfo] = useState([])
    useEffect(() => {
     
        axios.get('http://localhost:5000/users/freelancers')
            .then((resultinfo) => {
                console.log("resultinfo.data_________________", resultinfo.data);

                 setresultinfo(resultinfo.data.result)
            
            })
            .catch((err) => {
                console.log("error", err);
              
            });
      
    
      
    }, [])
    


    const freelancersinfo =resultinfo.map((freelancer)=>{
        // cv
        //   email
        //  firstname
        // id
        // image
        //  informationdescription
        // jobtitle
        //   lastname
        //  majority_id
        //  majorityname
        //  rate
        //  role_id
      
       return (
        <div className='freelancerinfo' key={freelancer.id}>
         <div className='img'><img src={freelancer.image}></img></div>
         <div>
            <div>{freelancer.firstname}  {freelancer.lastname} </div>
            <div>{ freelancer.jobtitle} </div>
            <p>{ freelancer.informationdescription}  </p>
         </div>
         <div>
       
         </div>
        </div>

       )


    })





  return (
    <div >
        
        {freelancersinfo}
    




        

    </div>
  )
}

export default Freelancer