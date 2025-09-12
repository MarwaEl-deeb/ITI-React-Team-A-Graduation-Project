import { useContext } from "react"
import { MainContext } from "../useContext"


function Pagination() {
    const { totalPages, setPage, page } = useContext(MainContext);
    const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => { return (<button className="w-100 h-25 paginationBtn" onClick={() => setPage(num)} key={num}>{num}</button>) })

    return (
        <div className="pagination">
            {paginationButtons}
        </div>
    )
}

export default Pagination;