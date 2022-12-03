import React from "react";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }),
      });

      if (res.status === 201) {
        navigate("/login");
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  return (
    <>
     <h1 className="h1">Register</h1>
      <form onSubmit={handleSubmit} method="post">
        <label> Firstname </label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label> Lastname </label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <label> Email </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label> Password </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onSubmit={handleSubmit}>submit</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </>
  );
};
