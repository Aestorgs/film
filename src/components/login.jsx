import React from "react";
import { useNavigate } from "react-router-dom";
import { users } from "..";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { setMe } = React.useContext(users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log("users" ,data.users);
      if (res.status === 200) {
        navigate("/home");
        setMe(data.users);
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };
  return (
    <>
    <h1 className="h1">Login</h1>
      <form onSubmit={handleSubmit} method="post">
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
