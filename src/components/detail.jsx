import React from "react";
import { useParams , useState } from "react-router-dom";
import img from'../img/imgNotFound.png'
export const Details = () => {

    const [detail , useDetail] = React.useState({})
    const {id} = useParams()

    React.useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
        .then(res => res.json())
        .then(data => useDetail(data))
        .catch(err => console.log(err))
    } , [])

    const films = Object.values(detail)

    return (
        <>
           <h1> Titre : {films[2]}</h1>
           <h2> Notes : {films[13]?.average} / 10</h2>
           <h3> Types : {films[5]}</h3>
           <img src={`${films[19]?.original ? films[19]?.original : img }`}/>
           <p>{films[20]}</p>
           <h2>Castings</h2>
           <div className="trait"></div>
           <div>
            {films[23]?.cast.map((p , index)=> {
                return (
                    <div key={index}>
                    <h3 >{p.person.name}</h3> 
                    <img  src={`${p.person.image?.medium ? p.person.image?.medium : img }`}/>
                    </div>
                )
            })}
           </div>
       </>
    )
}