import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";

export default function CardDetails({ id }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=dd1481c9866799f1bc15adf106a083fe`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loadspan"></div>
      </div>
    );
  }

  return (
    <div>
      {movie && (
        <>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            rounded
          />
          <div className="det"></div>

          {/* <h2>{movie.original_title}</h2>
          <p>{movie.overview}</p> */}
        </>
      )}
    </div>
  );
}
