import "./App.css";
import{Route,Routes} from "react-router-dom"
import Register from "./components/Register";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path={"/"} element={<Register/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;