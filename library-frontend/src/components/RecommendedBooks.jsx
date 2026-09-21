import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS, ME } from "../queries";

export const RecommendedBooks = (props) => {
  const allBooksResult = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  if (!props.show || !allBooksResult.data || !meResult.data) {
    return null;
  }

  const books = allBooksResult.data.allBooks;

  const userFavoriteGenres = new Set([meResult.data.me.favoriteGenre]);

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{userFavoriteGenres}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(
            (book) =>
              book.genres.some((genre) =>
                userFavoriteGenres.has(genre),
              ) /* if any of the book's genres are among the filter genres */ && (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ),
          )}
        </tbody>
      </table>
    </div>
  );
};
