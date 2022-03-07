import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNav from "../components/nav";
import Home from "../view/pages/Home";
import Scouting from "../view/pages/Scouting";
import VimeoFeed from "../components/VimeoFeed";
import Film from "../components/Film";
import Category from "../components/category/Category";
import CategoryLibrary from "../components/category/CategoryLibrary";
import FkFilmXfkCateLibrary from "../components/FkFilmXfkCateLibrary";
import Profile from "../components/Profile";
import GroupList from "../components/GroupList";
import FilmLibrary from "../components/FilmLibrary";
import * as ROUTES from "./routes";

function App() {
  return (
    <Router>
      <MainNav />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SCOUTING} element={<Scouting />} />
        <Route path={ROUTES.FEED} element={<VimeoFeed />} />
        <Route path={ROUTES.FILM} element={<Film />} />
        <Route path={ROUTES.FILM_LIBRARY} element={<FilmLibrary />} />
        <Route path={ROUTES.CATEGORY} element={<Category />} />
        <Route path={ROUTES.CATEGORY_LIBRARY} element={<CategoryLibrary />} />
        <Route
          path={ROUTES.FK_FILMXFK_CATE_LIBRARY}
          element={<FkFilmXfkCateLibrary />}
        />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.GROUP_LIST} element={<GroupList />} />
      </Routes>
    </Router>
  );
}

export default App;
