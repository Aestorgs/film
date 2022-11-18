import React from "react";
import { Link, useParams, useState } from "react-router-dom";
import img from "../img/imgNotFound.png";
import { Saison } from "./saison";
export const Details = () => {
  const [detail, useDetail] = React.useState({});
  const { id } = useParams();

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
      {<img src={`${detail.image?.original ? detail.image?.original : img}`} />}
      {<p>{detail.summary}</p>}
      <div>
        <Saison />
      </div>
      <h2>Castings</h2>
      <div className="trait"></div>
      {
        <div>
          {detail._embedded?.cast.map((p, index) => {
            return (
              <div key={index}>
                <h3>{p.person.name}</h3>
                <img
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
