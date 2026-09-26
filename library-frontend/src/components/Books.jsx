import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS, ALL_GENRES } from "../queries";

import { FilteredBooks } from "./common/FilteredBooks";

export const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const allBooksResult = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  const allGenresResult = useQuery(ALL_GENRES);

  if (!props.show || !allBooksResult.data || !allGenresResult.data) {
    return null;
  }

  const allGenres = allGenresResult.data.allGenres;

  const books = allBooksResult.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <FilteredBooks books={books} />
      <h2>Filter by genre:</h2>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
    </div>
  );
};
