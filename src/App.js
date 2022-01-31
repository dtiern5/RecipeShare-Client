import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import RecipesComponent from "./components/Recipes";
import MyRecipesComponent from "./components/MyRecipes";
import ProfileComponent from "./components/Profile";


const App = () => {
  
  const activePage = (index) => {
    return index
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={<Login />}>
        </Route>
        <Route
          path="/login"
          exact
          element={<Login />}>
        </Route>
        <Route
          path="/register"
          exact
          element={<Register />}>
        </Route>
        <Route
          path="/recipes"
          exact
          element={<RecipesComponent />}>
        </Route>
        <Route
          path="/myrecipes"
          exact
          element={<MyRecipesComponent />}>
        </Route>
        <Route
          path="/profile"
          exact
          element={<ProfileComponent />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
