import React from "react";
import { users } from "..";
import img from "../img/imgNotFound.png";
import { Link } from "react-router-dom";

export const Favoris = () => {
  const { me } = React.useContext(users);
  const [message, setMessage] = React.useState("");
  const [data, setData] = React.useState([]);

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
        setMessage({ id: p, message: "delete the film " });
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  return (
    <>
     <h1>Favoris</h1>
      <div className="list">
        {data.map((p, index) => {
          return (
            <div key={index}>
              <img src={p[0].image?.medium || img} />
              <Link to={`${p[0].id}`}>{p[0].name}</Link>
              <div>
                <button onClick={() => Delete(p[1])}>delete the film</button>
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
