import React, { useState, useEffect ,useRef} from "react";
import axios from "axios";
// import {Chart as ChartJS, BarElement,CategoryScale, LinearScale,Tooltip,Legend} from 'Chart.js'
// import {Bar} from 'react-chartjs-2';
import { ResponsiveBar } from '@nivo/bar'
import Title from './Title';


const ChartSecond = () => {
const [allusers, setallusers] = useState([])
const [clients, setclients] = useState([])
const [freelances, setfreelances] = useState([])

    const allUsers = () => {
        axios
          .get(`http://localhost:5000/users/`)
          .then((users) => {
            console.log("!!!!!!!!!!!!!!!!!!!!!", users.data);
            setallusers(users.data)
          })
          .catch((err) => {
            console.log("error", err);
          });
      };
    
      useEffect(() => {
        allUsers();
      }, []);

const result = ()=>{
    let arrfreelaner = []
    let arrclient = []
    allusers.map((usersnn,i)=>{
 
        if(usersnn.id===1){
            // console.log(1)
            arrfreelaner.push(usersnn.id)
           
        }
        if(usersnn.id===2){
            // console.log(2)
            arrclient.push(usersnn.id)
             
        }
    })
    setfreelances(arrfreelaner) 
     setclients(arrclient) 
}

useEffect(() => {
    result()
}, [allusers])

    console.log(clients.length)
    console.log(freelances.length)

const data = [
    {
      "country": "clients",
     
      "clients": clients.length,
      "kebabColor": "hsl(314, 70%, 50%)",
    
    },
    {
      "country": "freelances",
   
     
      "freelances": freelances.length,
      "friesColor": "hsl(345, 70%, 50%)",
      
    },
    {
      "country": "projects",
    
      "projects": clients.length+10,
      "donutColor": "hsl(134, 70%, 50%)"
    }
  ]



  return (
    <div style={{height:235}}> 
    <Title>Website Information</Title>
        <ResponsiveBar
    data={data}
    keys={[
        
    
        'clients',
        'freelances',
        'projects'
    ]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
    defs={[
        {
            // id: 'dots',
            // type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    fill={[
        {
            match: {
                id: 'freelances'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'sandwich'
            },
            id: 'lines'
        }
    ]}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                1.6
            ]
        ]
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'site data',
        legendPosition: 'middle',
        legendOffset: 32
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -40
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                1.6
            ]
        ]
    }}
    legends={[
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
/></div>
  )
}

export default ChartSecond



