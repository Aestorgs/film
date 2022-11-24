import React from "react";
import img from "../img/imgNotFound.png";
import { Link, useParams } from "react-router-dom";

export const Saison = () => {
    const {id} = useParams()
    const [data, setData] = React.useState([]);
    
      React.useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
          .then((res) => res.json())
          .then((data) => setData(data))
          .catch((err) => console.log(err));
      }, []);


    return(
        <>
        <h1>Saison</h1>
        <div className="list">
        {data.map((p, index) => {
          return (
            <div key={index}>
              <Link to={`${p.id}`}><img src={p.image?.medium || img} /></Link>
            </div>
          );
        })}
      </div>
        </>
    )
}