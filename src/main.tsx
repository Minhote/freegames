import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AllGames,
  BrowserGames,
  Filter,
  GameInfo,
  PcGames,
  TopGames,
} from "./layouts";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:name" element={<GameInfo />} />
        <Route path="/pc/*" element={<PcGames />} />
        <Route path="/browser/*" element={<BrowserGames />} />
        <Route path="/games/*" element={<AllGames />} />
        <Route path="/top/*" element={<TopGames />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
