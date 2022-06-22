import { useContext } from "react";

import { MoviesContext } from "../../context/MoviesContext";

import Header from "../../components/Header";
import Movies from "../../components/MoviesList";
import Filter from "../../components/Filter";

export default function Homepage() {
  return (
    <>
      <Header />
      <Filter />
      <Movies />
    </>
  );
}
