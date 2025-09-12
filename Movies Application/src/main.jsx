import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./Translator.js";
import MoviesHomePage from "./Pages/MoviesHomePage.jsx";
import TVShowsHomePage from "./Pages/TVShowsHomePage.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
import WatchListPage from "./Pages/WatchListPage.jsx";
import DetailsPage from "./Pages/DetailsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/TV-Shows",
    element: <TVShowsHomePage />,
  },
  {
    path: "/Search",
    element: <SearchPage />,
  },
  {
    path: "/WatchList",
    element: <WatchListPage />,
  },
  {
    path: "/DetailsPage",
    element: <DetailsPage />,
  },
  { path: "/movie/:id", element: <DetailsPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
