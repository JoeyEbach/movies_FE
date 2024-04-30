import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import getAllGenres from '../../api/genreData';
import { createMovie, updateMovie } from '../../api/movieData';

const initialState = {
  title: '',
  image: '',
  description: '',
  dateReleased: '',
};

export default function MovieForm({ movieObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, genreIds: selectedGenres };
    if (movieObj.id) {
      updateMovie(payload, movieObj.id).then(() => router.push(`/movie/${movieObj.id}`));
    } else {
      createMovie(payload).then((newMovie) => router.push(`/movie/${newMovie.id}`));
    }
  };

  useEffect(() => {
    if (movieObj.id) {
      setFormInput(movieObj);
    } else {
      setFormInput(initialState);
    }
    getAllGenres()?.then(setGenres);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Movie Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter movie title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Movie Image</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter movie image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Movie Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter movie description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date Released: </Form.Label>
        <Form.Control type="date" id="dateReleased" name="dateReleased" value={formInput.dateReleased} min="1910-10-31" max="2025-1-30" onChange={handleChange} />
      </Form.Group>

      {genres?.map((genre) => (
        <Form.Check
          key={genre.id}
          type="checkbox"
          label={genre.name}
          name="genreIds"
          onChange={() => {
            const selectedGenre = genre.id;
            if (selectedGenres.includes(selectedGenre)) {
              const newArray = selectedGenres.filter((id) => id !== selectedGenre);
              setSelectedGenres(newArray);
            } else {
              setSelectedGenres((prev) => [...prev, selectedGenre]);
            }
          }}
        />
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

MovieForm.propTypes = {
  movieObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    dateReleased: PropTypes.string,
    genreIds: PropTypes.arrayOf(PropTypes.number),
  }),
};

MovieForm.defaultProps = {
  movieObj: initialState,
};
