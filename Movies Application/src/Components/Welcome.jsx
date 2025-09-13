import { Link } from "react-router-dom";
import Search from "./Search";
function Welcome({ dataText }) {
    return (
        <div>
            <div className="WelcomeMainContainer">
                <div className="row WelcomeContainer">
                    <div className="col-12">
                        <section className="welcome">
                            <h2>
                                Welcome to our movie app
                            </h2>
                            <p>
                                Millions of movies ,TV shows and people to discover.Explore now.
                            </p>
                            <Search />
                        </section >
                    </div>
                </div>
            </div >

            <div className="nowPlaying">
                <h2>{dataText}</h2>
            </div>
        </div>
    )
}




export default Welcome;