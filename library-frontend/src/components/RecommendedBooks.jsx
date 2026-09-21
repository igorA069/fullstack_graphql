import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS, ME } from "../queries";

import { FilteredBooks } from "./common/FilteredBooks";

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
      <FilteredBooks books={books} selectedGenres={userFavoriteGenres} />
    </div>
  );
};
