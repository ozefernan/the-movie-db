import { useContext } from "react";

import { MoviesContext } from "../../context/MoviesContext";

import Card from "../Card";
import Pagination from "../Pagination";

import "./styles.css";

export default function Movies() {
  const { movies } = useContext(MoviesContext);

  return (
    <div className='movie-list-container'>
      <div className='movie-list-content'>
        {movies && movies.map((movie) => <Card key={movie.id} movie={movie} />)}
      </div>
      <div className='movie-list-footer-pagination'>
        <Pagination />
      </div>
    </div>
  );
}
