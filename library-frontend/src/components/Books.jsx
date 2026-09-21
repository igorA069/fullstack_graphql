import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS } from "../queries";

import { FilteredBooks } from "./common/FilteredBooks";

export const Books = (props) => {
  const [selectedGenres, setSelectedGenres] = useState(new Set());

  const allBooksResult = useQuery(ALL_BOOKS);

  if (!props.show || !allBooksResult.data) {
    return null;
  }

  const books = allBooksResult.data.allBooks;

  // transform an array of books that has an array of genres each into a set of overall occurring genres:
  const genres = books.reduce((accumulator, currentValue) => {
    currentValue.genres.forEach((genre) => accumulator.add(genre));
    return accumulator;
  }, new Set());

  return (
    <div>
      <h2>books</h2>
      <FilteredBooks books={books} selectedGenres={selectedGenres} />

      <h2>Filter by genre:</h2>

      {Array.from(genres).map((genre) => (
        <div key={genre}>
          <label>
            <input
              type="checkbox"
              name={genre}
              onChange={() => {
                const updatedSelectedGenres = new Set(selectedGenres);
                // toggle this genre within the filter:
                selectedGenres.has(genre)
                  ? updatedSelectedGenres.delete(genre)
                  : updatedSelectedGenres.add(genre);
                setSelectedGenres(updatedSelectedGenres);
              }}
            />
            {genre}
          </label>
        </div>
      ))}
    </div>
  );
};
