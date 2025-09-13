import { useEffect, useContext } from "react";
import Welcome from "../Components/Welcome";
import CardList from "../Components/Card";
import Pagination from "../Components/Pagination";
import { MainContext } from "../useContext";

function TVShowsHomePage() {
    const { setSelectedType } = useContext(MainContext);

    useEffect(() => {
        setSelectedType("movies");
    }, [setSelectedType]);
    return (
        <div>
            <Welcome />
            <CardList />
            <Pagination />
        </div>
    );
}

export default TVShowsHomePage;
