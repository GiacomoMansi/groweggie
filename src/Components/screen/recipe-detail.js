import React from "react";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
//Pagina in cui vengono resitutie più informazioni su una ricetta
const RecipeDetail = () => {
  const { detailPage } = useSelector((state) => state.detailPage);

  return (
    <Layout>
      <div className="recipe-section">
        {detailPage ? (
          [detailPage].map((item) => {
            //Primo map che mi restituisce le informazioni base

            return (
              <article className="detailPageArticle" key={item.id}>
                <h1 style={{ marginBottom: "20px" }}>{item.title}</h1>
                <img
                  style={{ marginBottom: "20px" }}
                  src={item.image}
                  alt={item.title}
                />
                {item.steps[0].steps.map((steps, index) => {
                  //Secondo map sull'array steps cosi da restituire tutti i passaggi
                  return (
                    <div key={index}>
                      <h4 style={{ color: "#007f5f" }} className="steps">
                        Step: {steps.number || ""}
                      </h4>
                      <p style={{ marginBottom: "10px" }}>{steps.step || ""}</p>
                    </div>
                  );
                })}
              </article>
            );
          })
        ) : (
          <h4>Make another search</h4>
        )}
      </div>
    </Layout>
  );
};

export default RecipeDetail;
