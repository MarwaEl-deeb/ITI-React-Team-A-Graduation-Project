import { useState, useEffect } from "react";
import Welcome from "./Components/Welcome";
import NavBar from "./Components/NavBar";
import CardList from "./Components/Card";
import Pagination from "./Components/Pagination";
import { MainContext } from "./useContext";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState("movies");

  useEffect(() => {
    setLoading(true);

    const endpoint =
      selectedType === "movies"
        ? `https://api.themoviedb.org/3/movie/now_playing?api_key=dd1481c9866799f1bc15adf106a083fe&page=${page}`
        : `https://api.themoviedb.org/3/tv/popular?api_key=dd1481c9866799f1bc15adf106a083fe&page=${page}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page, selectedType]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading"></div>
      </div >
    );
  }

  return (
    <MainContext.Provider
      value={{
        items,
        setItems,
        totalPages,
        page,
        setPage,
        loading,
        setLoading,
        selectedType,
        setSelectedType,
      }}
    >
      <NavBar />
      <Welcome />
      <CardList />
      <Pagination />
    </MainContext.Provider>
  );
}

export default App;
