import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";

const TvShows = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const GenresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (GenresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
    }
  }, [GenresLoaded, dispatch]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  const filteredMovies = movies.filter(({ name }) => {
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} search={search} setSearch={setSearch} />
      </div>

      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? <Slider movies={filteredMovies} /> : <NotAvailable />}
      </div>
    </Container>
  );
};

export default TvShows;

const Container = styled.div`
  .navbar {
    margin-bottom: 4rem;
  }

  .data {
    margin-top: 8rem;

    .NotAvailable {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }

  @media (max-width: 768px) {
    .data {
      margin-top: 6rem;
    }
  }

  @media (max-width: 480px) {
    .navbar {
      margin-bottom: 2rem;
    }

    .data {
      margin-top: 4rem;

      .NotAvailable {
        margin-top: 2rem;
      }
    }
  }
`;
