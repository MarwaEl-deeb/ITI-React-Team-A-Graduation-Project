import { useContext, useEffect } from "react"
import { MainContext } from "../useContext"
import Pagination from 'react-bootstrap/Pagination';
import { useSearchParams } from "react-router-dom";


function PaginationComponent() {


    const { totalPages, setTotalPages, setPage, page, selectedType } = useContext(MainContext);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let pageURL = parseInt(searchParams.get("page") || "1", 10)
        if (!isNaN(pageURL) && pageURL !== page) {
            setPage(pageURL)
        }
    }, [])

    useEffect(() => {
        setSearchParams({ page: page.toString() })
    }, [page, searchParams]);

    let maxPages = selectedType === "movies" ? totalPages : 500
    const window = 5;
    const start = Math.max(1, page - 2)
    const end = Math.min(maxPages, start + window - 1);

    let Pages = [];
    for (let i = start; i <= end; i++) {
        Pages.push
            (<Pagination.Item className="col-*"
                key={i}
                onClick={() => { setPage(i); console.log(i); }}
                active={i === page}>
                {i}

            </Pagination.Item>)
    }
    return (
        <Pagination className=" justify-content-center w-75">
            <Pagination.First className=" col-* paginationBtn"
                disabled={page === 1}
                onClick={() => { setPage(1) }} />

            <Pagination.Prev className=" col-* paginationBtn"
                disabled={page === 1}
                onClick={() => { setPage(page - 1) }} />
            {start > 1 && <Pagination.Ellipsis
                disabled={page === 1}
                className=" col-* ellipsis" />}
            {Pages}
            {end < maxPages && <Pagination.Ellipsis
                disabled={page === maxPages}
                className="col-* ellipsis" />}
            <Pagination.Next className=" col-* paginationBtn"
                disabled={page === maxPages}
                onClick={() => { setPage(page + 1) }} />
            <Pagination.Last className="col-* paginationBtn"
                disabled={page === maxPages}
                onClick={() => { setPage(maxPages) }} />
        </Pagination >
    )

}

export default PaginationComponent;