import "./App.css";
import Register from "./components/Register";
import Settings from "./components/Settings";
import { Routes, Route, Link, useParams,useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Projects from "./components/projects/Projects";
import Home from "./components/home/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Addproject from "./components/addproject/Addproject";
import Freelancer from "./components/Freelancer";
import ProjectInside from "./components/ProjectInside";
import BioAndSkills from "./components/BioAndSkills";
import Chatsocket from "./components/socket/Chatsocket"

import ChangePassword from "./components/ChangePassword"
import BalanceManagement from "./components/BalanceManagement";
import WorkSamples from "./components/WorkSamples";
import  DashboardContent from "./components/Admin/Bannel.js"
import Sucsses from "./components/Sucsses";
import ProfileSecond from "./components/ProfileSecond";
import Myoffer from "./components/myoffer/Myoffer";
import Myproject from "./components/myproject/Myproject"

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {




    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);


        window.onbeforeunload = function () {
          window.scrollTo(0, 0);
        }
      }, [pathname]);


  return (
    <div className="App">
     
      <header className="App-header">

   

      <Navbar/>

      </header>

<Routes>
<Route path="/admin" element={< DashboardContent />}/>
<Route path="/" element={<Home/>}/>
<Route path="/projects" element={<Projects/>}/>
<Route path="/freelancer" element={<Freelancer/>}/>
<Route path="/settings/personaldata" element={<Settings/>}/>
<Route path="/settings/bioandskills" element={<BioAndSkills/>}/>
<Route path="/settings/changepassword" element={<ChangePassword/>}/>
<Route path="/settings/worksamples" element={<WorkSamples/>}/>
<Route path="/settings/balancemanagement" element={<BalanceManagement/>}/>

<Route path="/Join" element={<Login/>}/>
 <Route path="/Register" element={<Register/>} />
 <Route path="/ProjectInside" element={<ProjectInside/>} />

<Route path = "/chat" element={<Chatsocket/>}/>
 

 <Route path="/Sucsses" element={<Sucsses/>} />

 <Route path="/ProjectInside" element={<ProjectInside/>} />


   <Route path="/profile" element={<Profile/>} />
   <Route path="/ProfileSecond" element={<ProfileSecond/>} />



 <Route path="/addproject" element={<Addproject/>}/>

    <Route path="/myoffer" element={<Myoffer/>}/>
    <Route path="/myproject" element={<Myproject/>}/>

</Routes>

<Footer/>

    </div>

  );
}

export default App;