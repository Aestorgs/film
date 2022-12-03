import React from "react";
import img from "../img/imgNotFound.png";
import { Link, useParams } from "react-router-dom";

export const Saison = () => {
  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const saisonSerie = async (p) => {
    try {
      const res = await fetch("http://localhost:3000/saison/shows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          saison: p.number,
          vue: true,
          shows: p.id,
        }),
      });
      if (res.status === 201) {
        setMessage({ id: p.id, message: "saison vue" });
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  return (
    <>
      <div className="listSaison">
        {data.map((p, index) => {
          return (
            <div key={index}>
               <h1 className="h1Saison">Saison {p.number}</h1>
              <Link to={`${p.id}`}>
                <img className="imgSaison" src={p.image?.medium || img} />
              </Link>
              <button className="buttonSaison" onClick={() => saisonSerie(p)}>vue</button>
              {p.id === message.id && message.message}
            </div>
          );
        })}
      </div>
    </>
  );
};
