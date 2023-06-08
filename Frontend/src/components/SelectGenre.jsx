import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();

  const handleGenreChange = (e) => {
    dispatch(fetchDataByGenre({ genre: e.target.value, type }));
  };

  return (
    <Select onChange={handleGenreChange}>
      {genres.map((genre) => (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;

  @media (max-width: 768px) {
    margin-left: 1.5rem;
    margin-top: 2.5rem;
  }
`;

export default SelectGenre;
