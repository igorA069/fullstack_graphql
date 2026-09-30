import { useState } from "react";

import { useQuery, useApolloClient } from "@apollo/client/react";

import { ALL_BOOKS, ALL_GENRES } from "../queries";

import { FilteredBooks } from "./common/FilteredBooks";

export const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const client = useApolloClient();

  const allBooksResult = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  const allGenresResult = useQuery(ALL_GENRES);

  if (!props.show || !allBooksResult.data || !allGenresResult.data) {
    return null;
  }

  const allGenres = allGenresResult.data.allGenres;

  const books = allBooksResult.data.allBooks;

  const onClickGenre = (genre) => {
    setSelectedGenre(genre);
    client.refetchQueries({ include: [ALL_BOOKS] });
  };

  return (
    <div>
      <h2>books</h2>
      {selectedGenre && (
        <>
          <br />
          in genre <strong>{selectedGenre}</strong>
          <br />
        </>
      )}
      <FilteredBooks books={books} genre={null} />
      {/* filtering by genre is done by DB and not by frontend */}
      <h2>Filter by genre:</h2>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => onClickGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => onClickGenre(null)}>all genres</button>
    </div>
  );
};
