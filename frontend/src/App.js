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

import Sucsses from "./components/Sucsses";
import ProfileSecond from "./components/ProfileSecond";
import Myoffer from "./components/myoffer/Myoffer";




function App() {

  
  return (
    <div className="App">
      <header className="App-header">

   

      <Navbar/>

      </header>

<Routes>
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

</Routes>
{/* <Chatsocket/> */}
{/* <Footer className="footer"/> */}
    </div>

  );
}

export default App;