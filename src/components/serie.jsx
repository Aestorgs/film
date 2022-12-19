import React from "react";
import img from "../img/imgNotFound.png";
import { Link, useParams } from "react-router-dom";

// afficher une serie 
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
      <div className="listserie">
        {data.map((p, index) => {
          return (
            <div key={index}>
                  <h3 className="h3serie">Episodes {p.number}</h3>
                  <Link to={`${p.id}`}><img className="imgserie" src={p.image?.medium || img} /></Link>
                  <h2 className="h2serie">{p.name}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
};
