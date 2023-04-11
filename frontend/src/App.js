
import "./App.css";

import Register from "./components/Register";


import { Routes, Route, Link, useParams,useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Projects from "./components/projects/Projects";
import Home from "./components/home/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <header className="App-header">

      

      <Navbar/>

      </header>

<Routes>
<Route path="/home" element={<Home/>}/>
<Route path="/projects" element={<Projects/>}/>
 
 <Route path="/register" element={<Register/>} />
   <Route path="/login" element={<Login/>} />
   <Route path="/profile" element={<Profile/>} />

</Routes>

<Footer/>
    </div>

  );
}

export default App;