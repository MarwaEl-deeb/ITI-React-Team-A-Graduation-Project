import { Link } from "react-router-dom";
import Search from "./Search";
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
                <Search />
            </section >
        </div >
    )
}




export default Welcome;