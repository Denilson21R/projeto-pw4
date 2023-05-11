import './App.css';
import Header from './components/header.js';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    //Link
} from "react-router-dom";
import Login from "./components/login";
import Recipes from "./components/recipes";
import Signup from "./components/signup";

function App(props) {
  return (
      <>
          <Router>
              <Header/>
              <Routes>
                  <Route path="/" element={<Recipes {...props}/>}></Route>
                  <Route path="/login" element={<Login {...props}/>}></Route>
                  <Route path="/signup" element={<Signup {...props}/>}></Route>
              </Routes>
          </Router>
      </>
  );
}

export default App;
