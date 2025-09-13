import { useEffect, useState, useContext } from "react";
import Welcome from "../Components/Welcome";
import CardList from "../Components/Card";
import Pagination from "../Components/Pagination";
import { MainContext } from "../useContext";

function TVShowsHomePage() {
    const { setSelectedType } = useContext(MainContext);
    const [tvItems, setTvItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setSelectedType("tv");
    }, [setSelectedType]);

    useEffect(() => {
        setLoading(true);

        fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=dd1481c9866799f1bc15adf106a083fe&page=${page}`
        )
            .then((res) => res.json())
            .then((data) => {
                setTvItems(data.results || []);
                setTotalPages(data.total_pages);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [page]);

    if (loading) {
        return <p>Loading TV Shows...</p>;
    }

    return (
        <div>
            <Welcome />
            <CardList data={tvItems} />
            <Pagination />
        </div>
    );
}

export default TVShowsHomePage;
