function NavBar() {
    return (
        <nav>
            <div className="navTitle">
                <strong>
                    <select name="categery" id="">
                    <option value="Movies">Movies</option>
                    <option value="TV Shows">TV Shows</option>
                </select>
                </strong>
            </div>
            <div>
                <select name="lang" id="">
                    <option value="En">En</option>
                    <option value="Ar">Ar</option>
                </select>
                <span>
                    <a href="#">
                       <img src="" alt="" />
                        Watch List
                    </a>
                </span>
            </div>
        </nav>

    )
}
export default NavBar