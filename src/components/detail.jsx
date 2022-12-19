import React from "react";
import { useParams, useState } from "react-router-dom";
import img from "../img/imgNotFound.png";
export const Detail = () => {
  const [detail, useDetail] = React.useState({});
  const { id } = useParams();

  // detail des films 
  React.useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
      .then((res) => res.json())
      .then((data) => {
        useDetail(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1> Titre : {detail.name}</h1>
      {<h2> Notes : {detail.rating?.average} / 10</h2>}
      {<h3> Types : {detail.genres}</h3>}
      {<img  className="imgsDetails" src={`${detail.image?.original ? detail.image?.original : img}`} />}
      {<p className="pDetails">{detail.summary}</p>}
      <h2 className="h2Details">Castings</h2>
      {
        <div className="detailsCastings">
          {detail._embedded?.cast.map((p, index) => {
            return (
              <div key={index}>
                <h3 className="persoDetails">{p.person.name}</h3>
                <img className="imgDetails"
                  src={`${
                    p.person.image?.medium ? p.person.image?.medium : img
                  }`}
                />
              </div>
            );
          })}
        </div>
      }
    </>
  );
};
