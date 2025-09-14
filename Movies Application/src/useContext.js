import { createContext } from "react";

export const MainContext = createContext({
  items: [],
  setItems: () => {},
  totalPages: 1,
  page: 1,
  setPage: () => {},
  loading: true,
  setLoading: () => {},
  selectedType: "movies",
  setSelectedType: () => {},
  watchlist: [],
  setWatchlist: () => {},
});

