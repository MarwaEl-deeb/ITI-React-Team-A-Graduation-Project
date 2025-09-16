import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Welcome from "./Components/Welcome";
import NavBar from "./Components/NavBar";
import CardList from "./Components/Card";
import PaginationComponent from "./Components/Pagination";
import { MainContext } from "./useContext";

function App() {
  const location = useLocation();
  const {
    items,
    setItems,
    totalPages,
    setTotalPages,
    page,
    setPage,
    loading,
    setLoading,
    selectedType,
    setSelectedType,
  } = useContext(MainContext);

  useEffect(() => {
    if (
      location.pathname.startsWith("/TV-Shows") ||
      location.pathname.startsWith("/tv")
    ) {
      setSelectedType("tv");
    } else {
      setSelectedType("movies");
    }
  }, [location.pathname, setSelectedType]);

  useEffect(() => {
    setLoading(true);
    const endpoint =
      selectedType === "movies"
        ? `https://api.themoviedb.org/3/movie/now_playing?api_key=dd1481c9866799f1bc15adf106a083fe&page=${page}`
        : `https://api.themoviedb.org/3/tv/popular?api_key=dd1481c9866799f1bc15adf106a083fe&page=${page}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page, selectedType, setItems, setTotalPages, setLoading]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loadspan"></div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Welcome
        dataText={
          selectedType === "movies" ? "Now Playing" : "Popular TV Shows"
        }
      />
      <CardList />
      <PaginationComponent />
    </>
  );
}

export default App;
