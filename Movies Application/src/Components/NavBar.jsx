import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [selected, setSelected] = useState("Movie App");

    // sync state with current route
    useEffect(() => {
        if (location.pathname === "/") {
            setSelected("Movie App");
        } else if (location.pathname === "/TV-Shows") {
            setSelected("TV Shows");
        }
    }, [location.pathname]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value); // update header text

        if (value === "Movie App") {
            navigate("/");
        } else if (value === "TV Shows") {
            navigate("/TV-Shows");
        }
    };

    return (
        <nav>
            <div className="navbar navTitle">
                <strong className="navbar-brand ">
                    <select className="form-select" name="categery" value={selected} onChange={handleChange} >

                        <option value="Movie App" selected >
                            Movie App
                        </option>
                        <option value="TV Shows">
                            TV Shows
                        </option>
                    </select>
                </strong>
            </div>
            <div className="d-flex headerRightSide fw-bold" style={{color:"#726625"}} >
                <select name="lang" className="form-select fw-bold" id="" style={{color:"#726625"}}>
                    <option value="En" selected>En</option>
                    <option value="Ar">Ar</option>
                </select>

                <span className="watchListIcon align-self-center">
                    <img src="./heartFilled.png" className="watchListIcon" />
                </span>

                <span className="align-self-center WatchLinkContainer">
                    <Link className="nav-link active position-relative" to="/WatchList">
                        <span className="watchListText">WatchList</span>
                        <span className="badge bg-white position-absolute top-0 ms-2 translate-middle">
                            <span className="favListNum">7</span>
                        </span>
                    </Link>

                </span>
            </div>
        </nav >

    )
}
export default NavBar