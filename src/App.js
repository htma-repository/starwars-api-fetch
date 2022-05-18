import React, { useState, Fragment, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: "Some Dummy Movie",
  //     openingText: "This is the opening text of the movie",
  //     releaseDate: "2021-05-18",
  //   },
  //   {
  //     id: 2,
  //     title: "Some Dummy Movie 2",
  //     openingText: "This is the second opening text of the movie",
  //     releaseDate: "2021-05-19",
  //   },
  // ];

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const movieFetchHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = await fetch("https://swapi.dev/api/films/");
      if (!url.ok) throw new Error("ERROR!");
      const res = await url.json();
      let moviesObj = res.results.map((mov) => {
        return {
          id: mov["episode_id"],
          title: mov["title"],
          openingText: mov["opening_crawl"],
          releaseDate: mov["release_date"],
        };
      });
      setMovies(moviesObj);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    movieFetchHandler();
  }, [movieFetchHandler]);

  console.log(movies);

  const content = isLoading ? (
    <p>{error ? `${error}` : "LOADING..."}</p>
  ) : movies.length === 0 ? (
    <p>Found No Movies</p>
  ) : (
    <MoviesList movies={movies} />
  );

  return (
    <Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </Fragment>
  );
}

export default App;
