import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS, ME } from "../queries";

import { FilteredBooks } from "./common/FilteredBooks";

export const RecommendedBooks = (props) => {
  const meResult = useQuery(ME);
  const allBooksResult = useQuery(ALL_BOOKS, {
    variables: { genre: meResult?.data?.me?.favoriteGenre },
  });

  if (
    !props.show ||
    !allBooksResult.data ||
    !meResult.data ||
    !meResult.data.me
  ) {
    return null;
  }

  const books = allBooksResult.data.allBooks;

  const userFavoriteGenre = meResult.data.me.favoriteGenre;

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{userFavoriteGenre}</strong>
      {/* filtering by genre is done by DB and not by frontend */}
      <FilteredBooks books={books} selectedGenres={null} />
    </div>
  );
};
