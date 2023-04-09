
import "./App.css";

import { Routes, Route, Link, useParams,useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Projects from "./components/projects/Projects";
import Home from "./components/home/Home";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Navbar/>
      </header>

<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/projects" element={<Projects/>}/>

</Routes>

<Footer/>
    </div>

  );
}

export default App;
