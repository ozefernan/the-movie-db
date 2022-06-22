import { useContext, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

import { PeapleContext } from "../../context/PeapleContext";

import defaultImage from "../../assets/images/defaultMovie.png";

import Header from "../../components/Header";

import "./styles.css";

export default function Peaple() {
  const {
    peaple: {
      name,
      birthday,
      biography,
      popularity,
      profile_path,
      place_of_birth,
    },
    setPeaple,
    handlePeaple,
  } = useContext(PeapleContext);
  const { personId } = useParams();
  const navigate = useNavigate();

  const imageBaseURL = process.env.REACT_APP_MOVIE_DB_IMAGE_PATH;

  const renderPeapleImage = () => {
    const imageSrc = profile_path
      ? `${imageBaseURL}/w500/${profile_path}`
      : defaultImage;

    return <img src={imageSrc} alt={name} />;
  };

  useEffect(() => {
    return () => {
      setPeaple({});
    };
  }, []);

  useEffect(() => {
    if (personId) {
      handlePeaple(personId);
    }
  }, [personId]);

  return (
    <>
      <Header withOutSearch />

      <div className='peaple-cotainer'>
        <div className='peaple-content'>
          <div className='peaple-info'>
            <div className='back-page' onClick={() => navigate(-1)}>
              <IoMdArrowBack size={24} />
            </div>

            <h1>
              {name}{" "}
              <div className='peaple-popularity'>
                Popularidade
                <span>{popularity}</span>
              </div>
            </h1>
            {birthday && (
              <h5>
                {new Date(birthday).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                em {place_of_birth}.
              </h5>
            )}

            <p>{biography}</p>
          </div>

          <div className='peaple-poster'>{renderPeapleImage()}</div>
        </div>
      </div>
    </>
  );
}
