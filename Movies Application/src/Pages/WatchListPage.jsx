import { Link } from "react-router-dom";


function WatchListPage() {
    const movies = [];

    return (
        <div className="container-fluid mt-4   h-100 " >
            <h3 className="text-start ps-5 " style={{color:"#A08E33", fontWeight:"bold"}}>Watch List</h3>

            <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: "70vh" }}
                >
                {movies.length === 0 ? (
                    <>
                    <img
                        src="/whatchlist.png" 
                        alt=""
                        style={{ width: "200px", }}
                    />

                    <p className="mt-3 fs-5">No Movies in watch list</p>

                    <Link to="/" className="  btn-custom mt-3 w-25 ">Back to home</Link>

                    </>

                ) : (
                    <p>...</p>
                )}
                </div>
        </div>
       )
}
export default WatchListPage