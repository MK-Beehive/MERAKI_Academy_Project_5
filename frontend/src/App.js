
import "./App.css";

import Register from "./components/Register";


import { Routes, Route, Link, useParams,useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Projects from "./components/projects/Projects";
import Home from "./components/home/Home";
import Addproject from "./components/addproject/Addproject";



function App() {
  return (
    <div className="App">
      <header className="App-header">

      

      <Navbar/>

      </header>

<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/projects" element={<Projects/>}/>
 <Route path={"/"} element={<Register/>} />
 <Route path="addproject" element={<Addproject/>}/>
    
</Routes>

<Footer/>
    </div>

  );
}

export default App;