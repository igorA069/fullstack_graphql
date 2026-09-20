import { useState } from "react";

import { useApolloClient } from "@apollo/client/react";
import { useMutation } from "@apollo/client/react";

import { LOGIN } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("authors");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("LIBRARY_ACCESS_TOKEN") != null,
  );

  const apolloClient = useApolloClient();

  const [loginMutation] = useMutation(LOGIN);

  const onLogout = async () => {
    localStorage.removeItem("LIBRARY_ACCESS_TOKEN");
    await apolloClient.clearStore();
    setIsUserLoggedIn(false);
    setPage("authors");
  };

  const onLogin = (username, password) => {
    loginMutation({
      variables: { username, password },
      onCompleted: (response) => {
        const accessToken = response.login.value;
        localStorage.setItem("LIBRARY_ACCESS_TOKEN", accessToken);
        setIsUserLoggedIn(true);
        setPage("authors");
      },
      onError: (error) => console.log(error.message),
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {isUserLoggedIn && (
          <button onClick={() => setPage("add")}>add book</button>
        )}
        {isUserLoggedIn && <button onClick={() => onLogout()}>logout</button>}
        {!isUserLoggedIn && (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} showSetBirthyear={isUserLoggedIn} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} onLogin={onLogin} />
    </div>
  );
};

export default App;
