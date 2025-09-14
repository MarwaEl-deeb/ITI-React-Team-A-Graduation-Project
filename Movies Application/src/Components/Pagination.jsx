import { useContext } from "react"
import { MainContext } from "../useContext"
import Pagination from 'react-bootstrap/Pagination';


function PaginationComponent() {

    
    const { totalPages , setTotalPages, setPage, page,selectedType } = useContext(MainContext);

    const window = 6;
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, start + window-1 )
    let Pages = [];
    for (let i = start; i < end; i++) {
        Pages.push
            (<Pagination.Item
                key={i}
                onClick={() => { setPage(i); console.log(i); }}
                active={i===page}>
                   {i}
            </Pagination.Item>)
    }
    return (
        <Pagination className="  w-75 justify-content-center ">
             <Pagination.First className="paginationBtn"
              disabled={page===1}
               onClick={() => { setPage(1) }}/>
            <Pagination.Prev className="paginationBtn"
             disabled={page===1} 
             onClick={() => { setPage(page-1) }} />

            {start > 1 && <Pagination.Ellipsis
             disabled={page===1} 
             className="paginationBtn"/>}
            {Pages}
            {end < totalPages && <Pagination.Ellipsis 
             disabled={page===totalPages} 
             className="paginationBtn"/>}
            <Pagination.Next className="paginationBtn"
             disabled={page===totalPages}
              onClick={() => { setPage(page+1) }}/>
            <Pagination.Last className="paginationBtn" 
            disabled={page===totalPages} 
            onClick={() => { setPage(totalPages) }} />
        </Pagination >
    )

}

export default PaginationComponent;