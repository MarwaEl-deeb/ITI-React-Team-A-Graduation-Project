import { createContext } from "react";
export const MainContext = createContext({
    items: [],
    setItems: () => { },
    totalPages: 1,
    page: 1,
    setPage: () => { },
    loading: false,
    setLoading: () => { },
    selectedType: "movies",
    setSelectedType: () => { },
});
