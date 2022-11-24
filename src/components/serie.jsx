import React from "react";
import img from "../img/imgNotFound.png";
import { useParams } from "react-router-dom";


export const Serie = () => {
  const { id } = useParams();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.tvmaze.com/seasons/${id}/episodes`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Serie {data[0]?.season}</h1>
      <div className="list">
        {data.map((p, index) => {
          return (
            <div key={index}>
                  <h3>Episodes {p.number}</h3>
                  <img src={p.image?.medium || img} />
                  <h2>{p.name}</h2>
                  <p>{p.summary}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
