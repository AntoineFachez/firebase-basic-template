import React from "react";
import Router from "./constants/Router";
import "./App.css";
import { FilmProvider } from "./context/FilmContext";
import { MainPlayerProvider, VimeoProvider } from "./context/VimeoContext";
import { CategoryProvider } from "./context/CategoryContext";
import { FkFilmXfkCateProvider } from "./context/FkFilmXfkCateContext";
import { UserAuthContextProvider } from "./context/AuthContext";

//FIXME: AuthProvider via getAuth() from firebase-config
function App() {
  return (
    <UserAuthContextProvider>
      <MainPlayerProvider>
        <FkFilmXfkCateProvider>
          <FilmProvider>
            <CategoryProvider>
              <Router />
            </CategoryProvider>
          </FilmProvider>
        </FkFilmXfkCateProvider>
      </MainPlayerProvider>
    </UserAuthContextProvider>
  );
}

export default App;

{
  /* </VimeoProvider> */
}
{
  /* <VimeoProvider> */
}
