import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { users } from "..";
import "../css/style.css";
import img from "../img/imgNotFound.png";

// affichage de l'utilisateur 
export const Home = () => {
  const [search, useSearch] = React.useState([]);
  const [values, useValues] = React.useState("");
  const { me } = React.useContext(users);
  const [message, setMessage] = React.useState("");
  const [favoris, setFavoris] = React.useState([]);
  const [user, setUser] = React.useState([]);

  const films = (e) => {
    e.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${values}`)
      .then((res) => res.json())
      .then((data) => useSearch(data))
      .catch((err) => console.log(err));
  };

  const shows = async (p) => {
    try {
      const res = await fetch("http://localhost:3000/favoris/shows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shows: p.show.id,
          users: me,
        }),
      });
      if (res.status === 201) {
        setMessage({ id: p.show.id, message: "Le film à été ajouté " });
        setFavoris((prev) => [...prev, { shows: p.show.id }]);
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/users/favoris/${me}`)
      .then((res) => res.json())
      .then((data) => setFavoris(data.favoris))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/users/favoris/${me}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Bienvenue : {user.firstname} {user.lastname} </h1>
      <Link to="/favoris">Favoris</Link>
      <h2 className="search">Rechercher le film ou serie </h2>
      <form onSubmit={films}>
        <input
          value={values}
          type="search"
          onChange={(e) => useValues(e.target.value)}
        />
        <button>Search</button>
      </form>
      <div className="listHome">
        {search.map((p, index) => {
          return (
            <div key={index}>
              <img className="imgHome"
                src={`${p.show.image?.medium ? p.show.image?.medium : img}`}
              />
              <Link className="aHome" to={`${p.show.id}`}>{p.show.name}</Link>
              <div>
                <button className="homeButton"
                  disabled={
                    favoris.find((f) => f.shows === p.show.id ||  f.shows.showsId === p.show.id) ? true : false
                  }
                  onClick={() => shows(p)}
                >
                  Ajouter le film
                </button>
                {p.show.id === message.id && message.message}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
