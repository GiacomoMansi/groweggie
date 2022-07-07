import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Components/screen/home-screen';
import RecipeDetail from "./Components/screen/recipe-detail"
import { useSelector } from 'react-redux';
function App() {
  const { recipes } = useSelector((state) => state.recipes);
  return (
    <div className="App">
     
        <Router>
          <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route  path="/recipeDetail:id"  element={<RecipeDetail></RecipeDetail>}></Route>
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
