import { useEffect, useState, useContext } from "react";
import Welcome from "../Components/Welcome";
import CardList from "../Components/Card";
import Pagination from "../Components/Pagination";
import { MainContext } from "../useContext";

function TVShowsHomePage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedType, setSelectedType] = useState("tv");
    const { setSelectedType: setGlobalSelectedType } = useContext(MainContext);

    useEffect(() => {
        setGlobalSelectedType("tv");
    }, [setGlobalSelectedType]);

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=dd1481c9866799f1bc15adf106a083fe&page=${page}`
        )
            .then((res) => res.json())
            .then((data) => {
                setItems(data.results || []);
                setTotalPages(data.total_pages || 1);
                setLoading(false);
            })
            .catch(() => setLoading(false));
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
            <Welcome dataText={"Popular"} />
            <CardList />
            <Pagination />
        </MainContext.Provider>
    );
}

export default TVShowsHomePage;


