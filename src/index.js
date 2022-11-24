import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Search } from "./components/search";
import { Detail } from "./components/detail";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Home } from "./components/home";
import { Favoris } from "./components/favoris";
import { Layout } from "./components/layout";
import { Details } from "./components/details";
import { Serie } from "./components/serie";
import { Episodes } from "./components/episode";

const root = document.getElementById("root");

const app = createRoot(root);

export const users = React.createContext();

const App = () => {
  const [me, setMe] = React.useState();

  return (
    <BrowserRouter>
      <users.Provider value={{ me  , setMe}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/" element={<Search />} />
          <Route path="/" element={<Layout />}>
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<Details />} />
            <Route path="/home/:id/:id" element={<Serie />}/>
            <Route path="/home/:id/:id/:id" element={<Episodes/>} />
            <Route path="/favoris/:id" element={<Details />} />
            <Route path="/favoris/:id/:id" element={<Serie />} />
            <Route path="/favoris/:id/:id/:id" element={<Episodes/>} />
          </Route>
        </Routes>
      </users.Provider>
    </BrowserRouter>
  );
};

app.render( <React.StrictMode><App /> </React.StrictMode>);
