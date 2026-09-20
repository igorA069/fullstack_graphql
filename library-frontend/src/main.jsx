import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";

import App from "./App.jsx";

const authLink = new SetContextLink(({ headers }) => {
  const accessToken = localStorage.getItem("LIBRARY_ACCESS_TOKEN");
  if (!accessToken) {
    return { headers };
  }
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(new HttpLink({ uri: "http://localhost:4000/" })),
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloProvider>,
);
