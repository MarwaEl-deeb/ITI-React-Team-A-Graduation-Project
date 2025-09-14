import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Search from "../Components/Search";
import CardList from "../Components/Card";
import { useTranslation } from "react-i18next";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=dd1481c9866799f1bc15adf106a083fe&query=${query}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results || []);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="SearchResult mt-5">
      <div className="searchPageInput "> <Search /> </div>

      {loading ? (
        <p>{t("Loading...")}</p>
      ) : (
        <>
          <h2 className="my-5 searchHeader">{t("Search Results for:")} "{query}"</h2>
          {results.length > 0 ? (
            <CardList data={results} isSearch={true} />
          ) : (
            <p className="notFoundResult" style={{ color: "red" }}>{t("NOT FOUND")} </p>
          )}
        </>
      )}
    </div>
  );
}
