import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNav from "../view/components/nav/index";
import Home from "../view/pages/Home";
import Scouting from "../view/pages/Scouting";
import VimeoFeed from "../view/components/scouting-tool/ScoutingTool";
import Film from "../view/components/film-library/Film";
import Category from "../view/components/category/Category";
import CategoryTable from "../view/components/category/CategoryTable";
import FkFilmXfkCateLibrary from "../view/components/FkFilmXfkCateLibrary";
import Profile from "../view/components/group/Profile";
import GroupList from "../view/components/group/GroupList";
import FilmLibrary from "../view/pages/Films";
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
        <Route path={ROUTES.CATEGORY_LIBRARY} element={<CategoryTable />} />
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
