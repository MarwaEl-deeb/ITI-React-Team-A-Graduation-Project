import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="container">
      <section className="welcome">
        <h2>
          Welcome to our movie app
        </h2>
        <p>
          Millions of movies ,TV shows and people to discover.Explore now.
        </p>
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
      </section >
    </div >
  )
}




export default Welcome;