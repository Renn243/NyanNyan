import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/AnimePage/Header";
import Footer from "./Component/AnimePage/Footer";
import Home from "./Component/AnimePage/Home";
import NotFound from "./Component/NotFound/NotFound";
import Detail from "./Component/AnimePage/Detail";
import Video from "./Component/AnimePage/Video";
import Ongoing from "./Component/AnimePage/Ongoing";
import Scroll from "./Component/AnimePage/Scroll";

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
          path="/ongoing"
          element={
            <>
              <Navbar />
              <Ongoing />
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
