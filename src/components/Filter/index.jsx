import { useState, useEffect, useContext } from "react";

import { MoviesContext } from "../../context/MoviesContext";
import Pagination from "../Pagination";

import "./styles.css";

export default function Filter() {
  const [genresOptions, setGenresOptions] = useState([]);
  const [filterChanged, setFilterChanged] = useState(false);
  const [genresSelected, setGenresSelected] = useState(null);
  const [sortBySelected, setSortBySelected] = useState(null);

  const {
    genres,
    pageInfo,
    customParams,
    handleGenres,
    handleDiscover,
    setCustomParams,
  } = useContext(MoviesContext);

  const sortByOptions = [
    { value: "vote_average.desc", label: "Avaliação" },
    { value: "popularity.desc", label: "Popularidade" },
    { value: "release_date.desc", label: "Oredem de Lançamento" },
    { value: "original_title.desc", label: "Ordem Alfabética" },
  ];

  useEffect(() => {
    handleGenres();
  }, []);

  useEffect(() => {
    if (sortBySelected) {
      const newCustomParams = { ...customParams, sort_by: sortBySelected };
      setCustomParams(newCustomParams);
      setFilterChanged(true);
    }
  }, [sortBySelected]);

  useEffect(() => {
    if (genres) {
      const newGenresOptions = genres.map(({ id, name }) => {
        return { value: id, label: name };
      });
      setGenresOptions(newGenresOptions);
    }
  }, [genres]);

  useEffect(() => {
    if (filterChanged) {
      setFilterChanged(false);
      handleDiscover(customParams);
    }
  }, [filterChanged]);

  return (
    <div className='filter-container'>
      <div className='filter-content'>
        <div className='filter-page-infos'>
          <span>{`${pageInfo.total_results} filmes encontrados`}</span>
          <Pagination />
        </div>
        <div className='filter-actions'>
          <>
            <select
              id='genresSelect'
              name='Genres'
              onChange={(e) => {
                setGenresSelected(e.target.value);
              }}
              defaultValue=''
            >
              <option value='' disabled hidden>
                ---
              </option>
              {genresOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <button
              className='header-filter-button'
              type='button'
              onClick={() => {
                const newCustomParams = {
                  ...customParams,
                  with_genres: genresSelected,
                };
                setCustomParams(newCustomParams);
                setFilterChanged(true);
              }}
            >
              Filtrar
            </button>
          </>

          <span className='vertical-divider' />

          <select
            id='sortBySelect'
            name='sortBy'
            onChange={(e) => {
              setSortBySelected(e.target.value);
            }}
            defaultValue='popularity.desc'
          >
            {sortByOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
