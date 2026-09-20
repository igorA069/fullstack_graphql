import { useQuery } from "@apollo/client/react";

import { ALL_AUTHORS } from "../queries";

import { AuthorSetBirthyear } from "./AuthorSetBirthyear";

const Authors = ({ show, showSetBirthyear }) => {
  const result = useQuery(ALL_AUTHORS);

  if (!show || !result.data) {
    return null;
  }
  const authors = result.data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showSetBirthyear && <AuthorSetBirthyear authors={authors} />}
    </div>
  );
};

export default Authors;
