import Welcome from "../Components/Welcome";
import CardList from "../Components/Card";
import Pagination from "../Components/Pagination";
import { useContext, useEffect } from "react";
import { MainContext } from "../useContext";

function TVShowsHomePage() {
    const { setSelectedType } = useContext(MainContext);

    useEffect(() => {
        setSelectedType("tv"); // set type
    }, [setSelectedType]);

    return (
        <div>
            <Welcome />
            <CardList /> {/* CardList fetches itself based on selectedType */}
            <Pagination />
        </div>
    );
}

export default TVShowsHomePage;
