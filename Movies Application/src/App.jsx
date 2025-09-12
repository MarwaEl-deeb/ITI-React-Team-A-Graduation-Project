import { useState, useEffect } from 'react'
import NavBar from './Components/NavBar'
import Search from './Components/Search'
import { MainContext } from './useContex'
import Movies from './Components/Card'
import Pagination from './Components/Pagination'
import Welcome from './Components/Welcome'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=dd1481c9866799f1bc15adf106a083fe&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages)
        setLoading(false)
      }
      )
      .catch((error) => { console.error(error) })
  }, [page])


  if (loading) {
    return (<div className="loading">
      <div className="loadspan">
      </div>
    </div>
    )
  }
  return (
    <MainContext.Provider value={{ movies, totalPages, page, setPage }}>
      <NavBar />
      <Welcome />
      <Movies />
      <Pagination />
    </MainContext.Provider>

  )
}

export default App
