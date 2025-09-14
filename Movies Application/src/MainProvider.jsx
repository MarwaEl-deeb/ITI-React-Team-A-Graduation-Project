import { useState } from "react";
import { MainContext } from "./useContext";

export function MainProvider({ children }) {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("movies"); // default

  return (
    <MainContext.Provider
      value={{
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
