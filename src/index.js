import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MoviesProvider } from "./context/MoviesContext";
import { PeapleProvider } from "./context/PeapleContext";

// pages
import Homepage from "./pages/Homepage";
import Moviepage from "./pages/Moviepage";
import Peaple from "./pages/Peaple";

// global/reset css
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <MoviesProvider>
      <PeapleProvider>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/movie/:movieId' element={<Moviepage />} />
          <Route path='/peaple/:personId' element={<Peaple />} />
        </Routes>
      </PeapleProvider>
    </MoviesProvider>
  </BrowserRouter>
);
