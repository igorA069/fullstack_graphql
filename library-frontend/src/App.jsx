import { useState } from "react";

import { useApolloClient } from "@apollo/client/react";
import { useMutation } from "@apollo/client/react";

import { LOGIN } from "./queries";

import Authors from "./components/Authors";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { Books } from "./components/Books";
import { RecommendedBooks } from "./components/RecommendedBooks";

const App = () => {
  const [page, setPage] = useState("authors");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("LIBRARY_ACCESS_TOKEN") != null,
  );
  const [notification, setNotification] = useState("");

  const apolloClient = useApolloClient();

  const [loginMutation] = useMutation(LOGIN);

  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(""), 5000);
  };

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
      onError: (error) => showNotification("login failed"),
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
        {isUserLoggedIn && (
          <button onClick={() => setPage("recommended")}>recommend</button>
        )}
        {isUserLoggedIn && <button onClick={() => onLogout()}>logout</button>}
        {!isUserLoggedIn && (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <div>{notification}</div>

      <Authors show={page === "authors"} showSetBirthyear={isUserLoggedIn} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <RecommendedBooks show={page === "recommended"} />

      <Login show={page === "login"} onLogin={onLogin} />
    </div>
  );
};

export default App;
