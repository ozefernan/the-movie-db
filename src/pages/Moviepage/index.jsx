import { useContext, useEffect } from "react";

import { NavLink, useParams } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import YouTube from "react-youtube";

import { MoviesContext } from "../../context/MoviesContext";

import defaultImage from "../../assets/images/defaultMovie.png";

import Header from "../../components/Header";
import Card from "../../components/Card";

import "./styles.css";

export default function Moviepage() {
  const {
    movieCast,
    handleMovie,
    similarMovies,
    movieSelected: {
      overview,
      popularity,
      vote_count,
      poster_path,
      vote_average,
      original_title,
      production_companies,
      videos,
    },
    handleMovieCast,
    setMovieSelected,
    handleSimilarMovies,
  } = useContext(MoviesContext);

  const { movieId } = useParams();

  const imageBaseURL = process.env.REACT_APP_MOVIE_DB_IMAGE_PATH;

  const renderMovieImage = () => {
    const imageSrc = poster_path
      ? `${imageBaseURL}/w500/${poster_path}`
      : defaultImage;

    return <img src={imageSrc} alt={`Movie from ${original_title}`} />;
  };

  const renderTrailer = () => {
    if (videos) {
      const trailer = videos.results.find((video) => video.type === "Trailer");

      if (trailer)
        return (
          <div className='movie-trailer'>
            <YouTube
              videoId={trailer.key}
              opts={{ height: "450", width: "750" }}
            />
          </div>
        );
    }
  };

  useEffect(() => {
    return () => {
      setMovieSelected("");
    };
  }, []);

  useEffect(() => {
    if (movieId) {
      handleMovie(movieId);
      handleMovieCast(movieId);
      handleSimilarMovies(movieId);
    }
  }, [movieId]);

  return (
    <>
      <Header withOutSearch />

      <div className='movie-cotainer'>
        <div className='movie-content'>
          <div className='movie-poster'>
            {renderMovieImage()}

            <div className='movie-poster-info'>
              <div>
                <h5>
                  Votos: {vote_count && vote_count.toLocaleString("pr-BR")}
                </h5>
                <h5>
                  Popularidade:{" "}
                  {popularity && popularity.toLocaleString("pr-BR")}
                </h5>
              </div>

              <h2>
                <AiOutlineStar />
                <div>
                  <strong>{vote_average}</strong>
                  <i>/10</i>
                </div>
              </h2>
            </div>
          </div>

          <div className='movie-info'>
            <h1 className='movie-title'>{original_title}</h1>
            {production_companies && production_companies[0] && (
              <h5 className='movie-companie'>{production_companies[0].name}</h5>
            )}

            <h4 className='movie-sinopse'>{overview}</h4>

            <div className='movie-cast'>
              <p>
                Atores:{" "}
                {movieCast.map((cast, index) => {
                  const { length } = movieCast;
                  if (index === length - 1) {
                    return (
                      <NavLink
                        key={cast.id}
                        to={`/peaple/${cast.id}`}
                      >{` e ${cast.name}.`}</NavLink>
                    );
                  }

                  if (index === length - 2) {
                    return (
                      <NavLink key={cast.id} to={`/peaple/${cast.id}`}>
                        {cast.name}
                      </NavLink>
                    );
                  }

                  return (
                    <NavLink
                      key={cast.id}
                      to={`/peaple/${cast.id}`}
                    >{`${cast.name}, `}</NavLink>
                  );
                })}
              </p>
            </div>

            {renderTrailer()}
          </div>
        </div>

        <div className='movie-similar'>
          <h2>Filmes Semelhantes: </h2>

          <div className='movie-similar-list'>
            {similarMovies &&
              similarMovies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
