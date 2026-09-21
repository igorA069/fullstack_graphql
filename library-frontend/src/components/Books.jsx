import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS } from "../queries";

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
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(
            (book) =>
              (selectedGenres.size === 0 /* if no filters are set */ ||
                book.genres.some((genre) =>
                  selectedGenres.has(genre),
                )) /* if any of the book's genres are among the filter genres */ && (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ),
          )}
        </tbody>
      </table>

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
