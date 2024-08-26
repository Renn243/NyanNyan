import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/AnimePage/Header";
import Footer from "./Component/AnimePage/Footer";
import Home from "./Component/AnimePage/Home";
import NotFound from "./Component/NotFound/NotFound";
import Detail from "./Component/AnimePage/Detail";
import Video from "./Component/AnimePage/Video";
import MoreAnime from "./Component/AnimePage/MoreAnime";
import Scroll from "./Component/AnimePage/Scroll";
import AnimeList from "./Component/AnimePage/AnimeList";

function App() {
  return (
    <BrowserRouter>
      <Scroll />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/AnimeList"
          element={
            <>
              <Navbar />
              <AnimeList />
              <Footer />
            </>
          }
        />
        <Route
          path="/more/:type"
          element={
            <>
              <Navbar />
              <MoreAnime />
              <Footer />
            </>
          }
        />
        <Route
          path="/more/genre/:type"
          element={
            <>
              <Navbar />
              <MoreAnime />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/:animeCode/:animeId"
          element={
            <>
              <Navbar />
              <Detail />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/:animeCode/:animeId/:episodeNumber"
          element={
            <>
              <Navbar />
              <Video />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
