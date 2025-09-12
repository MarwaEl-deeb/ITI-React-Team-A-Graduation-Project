import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import RatingStars from "./RatingStars";
import "../index.css";

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
  // convert date
  const formattedDate = new Date(movie.release_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div>
      {movie && (
        <>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            rounded
          />
          <div className="card-details "></div>
          <h1>{movie.original_title}</h1>
          <p>{formattedDate}</p>
          <p>
            <RatingStars rating={movie.vote_average} votes={movie.vote_count} />
          </p>
          <p>{movie.overview}</p>
          <div className="moving-classign ">
            {movie.genres &&
              movie.genres.map((g) => (
                <span key={g.id} className="badge bg-secondary me-2">
                  {g.name}
                </span>
              ))}
          </div>
          <p>
            <strong>Duration:</strong> {movie.runtime} Min.
          </p>
          <p>
            <strong>Languages:</strong>
            {movie.spoken_languages &&
              movie.spoken_languages
                .map((lang) => lang.english_name)
                .join(", ")}
          </p>

          <div className="company-logo">
            {movie.production_companies.length > 0 &&
              movie.production_companies[0].logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.production_companies[0].logo_path}`}
                  alt={movie.production_companies[0].name}
                />
              )}
          </div>
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer "
            style={{
              textDecoration: "none",
              color: "gray",
              padding: "5px",
              border: "1px solid yellow",
              borderRadius: "6px",
              margin: "5px",
            }}
          >
            Website
          </a>
        </>
      )}
    </div>
  );
}
