import { Link } from "react-router-dom";


function WatchListPage() {
    const movies = [];

    return (
<div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      {movies.length === 0 ? (
        <>
          <img
            src="/whatchlist.png" 
            alt=""
            style={{ width: "120px", }}
          />

          <p className="mt-3">No Movies in watch list</p>

          <Link to="/" className="btn btn-warning mt-3">
            Back to home
          </Link>
        </>
      ) : (
        <p>...</p>
      )}
    </div>
       )
}
export default WatchListPage