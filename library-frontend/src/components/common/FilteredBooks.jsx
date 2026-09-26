export const FilteredBooks = ({ books, selectedGenres }) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>author</th>
        <th>published</th>
      </tr>
      {books.map(
        (book) =>
          (!selectedGenres ||
            selectedGenres.size === 0 /* if no filters are set */ ||
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
);
