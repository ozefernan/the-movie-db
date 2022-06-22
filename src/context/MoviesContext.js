import { createContext, useEffect, useState } from "react";

export const MoviesContext = createContext([]);

export function MoviesProvider({ children }) {
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [movieCast, setMovieCast] = useState([]);
  const [customParams, setCustomParams] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState("");

  const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;
  const baseUrl = process.env.REACT_APP_MOVIE_DB_BASE_URL;

  const handleDiscover = async (customParams = {}) => {
    let url = new URL(`${baseUrl}/discover/movie`);
    url.search = new URLSearchParams({
      api_key: apiKey,
      ...(customParams && customParams),
    });

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(({ results, page, total_pages, total_results }) => {
        setMovies(results);
        setPageInfo({
          page,
          total_pages,
          total_results,
          items_in_page: results.length,
        });
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleSearch = async (searchValue) => {
    let url = new URL(`${baseUrl}/search/movie`);
    url.search = new URLSearchParams({
      api_key: apiKey,
      query: searchValue,
    });

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(({ results, page, total_pages, total_results }) => {
        setMovies(results);
        setPageInfo({
          page,
          total_pages,
          total_results,
          items_in_page: results.length,
        });
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleGenres = async () => {
    let url = new URL(`${baseUrl}/genre/movie/list`);
    url.search = new URLSearchParams({
      api_key: apiKey,
    });

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleMovie = async (movieId) => {
    let url = new URL(`${baseUrl}/movie/${movieId}`);
    url.search = new URLSearchParams({
      api_key: apiKey,
      append_to_response: "videos,images",
    });

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(setMovieSelected)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleSimilarMovies = async (movieId) => {
    let url = new URL(`${baseUrl}/movie/${movieId}/similar`);
    url.search = new URLSearchParams({
      api_key: apiKey,
    });

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(({ results, page, total_pages, total_results }) => {
        setSimilarMovies(results);
        setPageInfo({
          page,
          total_pages,
          total_results,
          items_in_page: results.length,
        });
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleMovieCast = async (movieId) => {
    let url = new URL(`${baseUrl}/movie/${movieId}/credits`);
    url.search = new URLSearchParams({
      api_key: apiKey,
    });

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(({ cast }) => {
        setMovieCast(cast.slice(0, 10));
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleDiscover();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        error,
        movies,
        genres,
        loading,
        pageInfo,
        movieCast,
        customParams,
        similarMovies,
        movieSelected,
        setCustomParams,
        setMovieSelected,

        handleMovie,
        handleSearch,
        handleGenres,
        handleDiscover,
        handleMovieCast,
        handleSimilarMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
