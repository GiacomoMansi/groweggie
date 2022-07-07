import React from "react";
import "./../Recipes/index.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddToDetialPage } from "../../redux/reducers/detailRecipe-reducer";
const Recipes = () => {
  const { recipes, error, loading } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  return (
    <div className="recipe-section">
      {!loading && !error.status && recipes.length > 0 ? (
        recipes.map((recipe, index) => {
          //Map dell'array del nostro state recipes che si trova nello store redux
          let id = recipe.id;
          let title = recipe.title; //Variabili per gestire al meglio i valori da restituire
          let image = recipe.image;
          let steps = recipe.analyzedInstructions;
          return (
            <article key={id}>
              <h1>{title}</h1>
              <img src={image} alt={title} />
              <Link
                to={`/recipeDetail:${id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <button
                  onClick={() =>
                    dispatch(
                      AddToDetialPage({
                        id,
                        title,
                        image,
                        steps,
                      })
                    )
                  }
                >
                  Recipe Details
                </button>
              </Link>
            </article>
          );
        })
      ) : !loading && error.status ? (
        <h3 className="error">
          {error.message && error.message.length > 0 //Gestioni dei vari errori che potrebbero esserci come un errore 402.
            ? error.message.join(" ")
            : "Sorry, there was an Error, Try Again or Try later"}
        </h3>
      ) : loading ? (
        <h3 className="loading">Loading...</h3> //Loading mentre effettuiamo la chiamta all'api
      ) : (
        <h3></h3>
      )}
    </div>
  );
};

export default Recipes;
