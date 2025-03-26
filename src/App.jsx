import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Create from "./Create";
import Update from "./Update";
import Read from "./Read";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Crud-Operation" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/read/:id" element={<Read />} />
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
