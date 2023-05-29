import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikedMovies } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { firebaseAuth } from "../utils/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserLiked = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.movies);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) setEmail(currUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email, dispatch]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} search={search} setSearch={setSearch} />
      <div className="content flex column">
        <h1>My List</h1>

        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <div key={index}>
                <Card movieData={movie} index={movie.id} isLiked="true" />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default UserLiked;

const Container = styled.div`
  .navbar {
    margin-bottom: 4rem;
  }

  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
