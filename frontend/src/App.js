
import "./App.css";

import Register from "./components/Register";




import { Routes, Route, Link, useParams,useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Projects from "./components/projects/Projects";
import Home from "./components/home/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Addproject from "./components/addproject/Addproject";




function App() {
  return (
    <div className="App">
      <header className="App-header">

      

      <Navbar/>

      </header>

<Routes>
<Route path="/home" element={<Home/>}/>
<Route path="/projects" element={<Projects/>}/>

<Route path="/Join" element={<Login/>}/>
 <Route path="/Register" element={<Register/>} />




   <Route path="/profile" element={<Profile/>} />



 <Route path="addproject" element={<Addproject/>}/>

    

</Routes>

{/* <Footer className="footer"/> */}
    </div>

  );
}

export default App;