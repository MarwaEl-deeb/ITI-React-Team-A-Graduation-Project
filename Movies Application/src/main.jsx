import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./Translator.js";
import TVShowsHomePage from "./Pages/TVShowsHomePage.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
import WatchListPage from "./Pages/WatchListPage.jsx";
import DetailsPage from "./Pages/DetailsPage.jsx";
import NavBar from "./Components/NavBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/TV-Shows",
    element: (
      <>
        <NavBar />
        <TVShowsHomePage />
      </>
    ),
  },
  {
    path: "/Search",
    element: (
      <>
        <NavBar />
        <SearchPage />
      </>
    ),
  },
  {
    path: "/WatchList",
    element: (
      <>
        <NavBar />
        <WatchListPage />
      </>
    ),
  },
  {
    path: "/DetailsPage",
    element: (
      <>
        <DetailsPage />
      </>
    ),
  },
  { path: "/movie/:id", element: <DetailsPage /> },
  {path:"*",
    element:(
      <div className="d-flex justify-content-center align-items-center "
      style={{height:"100vh"}}>
        <h1>ops!</h1>
      </div>
    )
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
