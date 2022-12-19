import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Search } from "./components/search";
import { Details } from "./components/detail";
const root = document.getElementById('root')

const app = createRoot(root)

// afficher les composents
app.render(
        <BrowserRouter>
          <Routes>
                 <Route path="/" element={<Search/>}/>
                 <Route path="/:id" element={<Details/>}/>
          </Routes>
        </BrowserRouter>
)
