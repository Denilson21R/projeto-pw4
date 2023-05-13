import './App.css';
import Header from './components/header.js';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from "./components/login";
import Recipes from "./components/recipes";
import Signup from "./components/signup";
import Ingredients from "./components/ingredients";

function App() {
  return (
      <>
          <Router>
              <Header/>
              <Routes>
                  <Route path="/" element={<Recipes/>}></Route>
                  <Route path="/recipes" element={<Recipes/>}></Route>
                  <Route path="/ingredients" element={<Ingredients/>}></Route>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/signup" element={<Signup/>}></Route>
              </Routes>
          </Router>
      </>
  );
}

export default App;
