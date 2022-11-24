import React from "react";
import img from "../img/imgNotFound.png";
import { useParams } from "react-router-dom";

export const Episodes = () => {
  const { id } = useParams();
  const [data, setData] = React.useState({});
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    fetch(`https://api.tvmaze.com/episodes/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const episodesSaison = async () => {
    try {
      const res = await fetch("http://localhost:3000/episode/saison", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          episode: data.id,
          vue: true,
          saison: data.season,
        }),
      });
      if (res.status === 201) {
        setMessage({ id: data.id, message: " episode vue" });
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  return (
    <>
      <h1>Details Episode {data.number}</h1>
      <h2>{data.name}</h2>
      <div className="list">
        <div>
          <img src={data.image?.medium || img} />
          <p>{data.summary}</p>
          <button onClick={() => episodesSaison()}>vue</button>
             {data.id === message.id && message.message}
        </div>
      </div>
    </>
  );
};
