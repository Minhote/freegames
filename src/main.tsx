import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowGames, Filter, GameInfo, TopGames } from "./layouts";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:name" element={<GameInfo />} />
        <Route path="/pc/*" element={<ShowGames />} />
        <Route path="/browser/*" element={<ShowGames />} />
        <Route path="/games/*" element={<ShowGames />} />
        <Route path="/top/*" element={<TopGames />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
