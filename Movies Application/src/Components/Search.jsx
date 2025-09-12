import { Link } from "react-router-dom";

function Search() {
  return (
    <div className="row">

      <div className="col-9 col-lg-10 btnSearchContainer">
        <input type="text" className="serachInput" placeholder="Search and Explore..." />
      </div>

      <div className="col-3 col-lg-2">
        <Link to="/Search">
          <button className="SearchButton">Search</button>
        </Link>
      </div>

    </div>
  )
}




export default Search;