import React from "react";
import img from "../img/imgNotFound.png";
import { useParams } from "react-router-dom";


export const Episodes = () => {
  const { id } = useParams();
  const [data, setData] = React.useState({});
  console.log(id)

  React.useEffect(() => {
    fetch(`https://api.tvmaze.com/episodes/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <h1>Details Episode {data.number}</h1>
     <h2>{data.name}</h2>
     {console.log(data)}
        <div className="list">
            <div>
              <img src={data.image?.medium || img} />
              <p>{data.summary}</p>
            </div>
      </div>
    </>
  );
};