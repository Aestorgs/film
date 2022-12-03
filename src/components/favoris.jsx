import React from "react";
import { users } from "..";
import img from "../img/imgNotFound.png";
import { Link } from "react-router-dom";

export const Favoris = () => {
  const { me } = React.useContext(users);
  const [message, setMessage] = React.useState("");
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://localhost:3000/users/favoris/${me}`)
      .then((res) => res.json())
      .then(async (shows) => {
        const show = await Promise.all(
          shows.favoris.map((fav) => {
            return fetch(
              `https://api.tvmaze.com/shows/${fav.shows.showsId}?embed=cast`
            )
              .then((res) => res.json())
              .then((data) => [data, fav.id])
              .catch((err) => console.log(err));
          })
        );
        setData(show);
      })
      .catch((err) => console.log(err));
  }, []);

  const Delete = async (p) => {
    try {
      const res = await fetch(`http://localhost:3000/favoris/${p}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setMessage({ id: p, message: "Le film à été supprimer  " });
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  React.useEffect(() => {
    fetch(`http://localhost:3000/users/favoris/${me}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
     <h1>Favoris de {user.firstname} {user.lastname}</h1>
      <div className="listFavoris">
        {data.map((p, index) => {
          return (
            <div key={index}>
              <img className="imgFavoris" src={p[0].image?.medium || img} />
              <Link className="aFavoris" to={`${p[0].id}`}>{p[0].name}</Link>
              <div>
                <button className="favorisButton" onClick={() => Delete(p[1])}>Supprimer le film</button>
                <div className="message">
                  {p[1] === message.id && message.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
