import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TvShows from "./pages/TvShows";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<TvShows />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
