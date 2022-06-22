import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/images/defaultMovie.png";

import "./styles.css";

export default function Card({
  movie: { id, poster_path, original_title, vote_average },
}) {
  const navigate = useNavigate();

  const renderMovieImage = () => {
    const imageBaseURL = process.env.REACT_APP_MOVIE_DB_IMAGE_PATH;
    const imageSrc = poster_path
      ? `${imageBaseURL}/w500/${poster_path}`
      : defaultImage;

    return (
      <img
        className='card-image'
        src={imageSrc}
        alt={`Movie from ${original_title}`}
      />
    );
  };

  return (
    <div className='card-container'>
      <div className='card-poster'>
        <div
          className='card-curtain'
          onClick={() => navigate(`/movie/${id}`, { replace: true })}
        />

        {renderMovieImage()}

        <div className='card-average'>
          {parseFloat(vote_average.toFixed(1))}
        </div>

        <div className='card-footer'>
          <p className='card-title'>{original_title}</p>
        </div>
      </div>
    </div>
  );
}
