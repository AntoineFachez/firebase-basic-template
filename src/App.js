import React from "react";
import Router from "./constants/Router";
import "./App.css";
import { UserAuthContextProvider } from "./context/AuthContext";
import { VimeoProvider } from "./context/VimeoContext";
import { ScoutingProvider } from "./context/ScoutingContext";
import { FkFilmXfkCateProvider } from "./context/FkFilmXfkCateContext";
import { FilmProvider } from "./context/FilmContext";
import { CategoryProvider } from "./context/CategoryContext";
import { MainPlayerProvider } from "./context/MainPlayerContext";

//FIXME: AuthProvider via getAuth() from firebase-config
function App() {
  return (
    <VimeoProvider>
      <UserAuthContextProvider>
        <ScoutingProvider>
          <FkFilmXfkCateProvider>
            <FilmProvider>
              <CategoryProvider>
                <MainPlayerProvider>
                  <Router />
                </MainPlayerProvider>
              </CategoryProvider>
            </FilmProvider>
          </FkFilmXfkCateProvider>
        </ScoutingProvider>
      </UserAuthContextProvider>
    </VimeoProvider>
  );
}

export default App;

{
  /* </VimeoProvider> */
}
{
  /* <VimeoProvider> */
}
