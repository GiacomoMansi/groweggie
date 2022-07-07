import React, { useEffect, useState } from "react";
import "./../SearchInput/Index.css";
import Video from "../../images/GrowWeggie2.mp4";
import { RiFindReplaceLine } from "react-icons/ri";
import {
  fetchData,
  saveQuery,
  catchError,
  cleanError,
} from "../../redux/reducers/api-reducer";
import { useDispatch, useSelector } from "react-redux";
import Recipes from "../Recipes/Recipes";
import { connect } from "react-redux";

const SearchInput = () => {
  const dispatch = useDispatch();
  const {
    query: lastSearch,
  } = useSelector((state) => state.recipes);
  let [query, setQuery] = useState(lastSearch.query || ""); // Restituisco l'ultima ricerca dell'utente
  //Prendo lo state di recipes
  const { recipes } = useSelector((state) => state.recipes);
  //Funzione che gestisce sia la query sia in caso l'utente non inserisca nessun valore
  const fetchRecipes = () => {
    let apiUrl = `&query=${query}`;
    if (!query || query === " ") {
      dispatch(catchError(["Insert at least one characther"]));
      return;
    }
    dispatch(fetchData(`${apiUrl}`));
    dispatch(
      saveQuery({
        path: `${apiUrl}`.trim(),
        query, //Costruisco l'url per la chiamata dell'utente
      })
    );
  };
  //Gestione dell' input
  const handleChange = (e) => {
    dispatch(cleanError());
    const { value } = e.target;
    setQuery(value);
  };

  useEffect(() => {
    if (!lastSearch.query) {
      fetchRecipes();
    } else {
      fetchRecipes();
    }
  }, []);
  
  return (
    <div className="searchInput">
      <video autoPlay="autoplay" id="vid" muted loop>
        <source src={Video} type="video/mp4" />
      </video>
      <input
        name="queryValue"
        onChange={handleChange}
        value={query}
        placeholder="Here what you want to search"
      ></input>
      <button onClick={() => fetchRecipes()}>
        Find Recipe &nbsp; <RiFindReplaceLine></RiFindReplaceLine>
      </button>
      <Recipes key={recipes.id} {...recipes} query={query}></Recipes>
    </div>
  );
};

export default connect()(SearchInput);
