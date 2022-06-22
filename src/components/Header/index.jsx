import { useState, useContext } from "react";

import { NavLink } from "react-router-dom";

import { MoviesContext } from "../../context/MoviesContext";

import "./styles.css";

export default function Header({ withOutSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const { handleSearch, handleDiscover } = useContext(MoviesContext);

  const searchMovies = (e) => {
    e.preventDefault();
    searchValue ? handleSearch(searchValue) : handleDiscover();
  };

  return (
    <header className='header-container'>
      <div className='header-content'>
        <NavLink to='/'>
          <div className='header-logo-side'>
            <h1>The Movie</h1>
          </div>
        </NavLink>

        {!withOutSearch && (
          <div className='header-search-side'>
            <form onSubmit={searchMovies}>
              <input
                type='text'
                onChange={(e) => setSearchValue(e.target.value)}
              />

              <button type='submit'>Pesquisar</button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
