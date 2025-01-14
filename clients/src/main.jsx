import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import App from "./App";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

// const query = gql`
//   query {
//     allPersons {
//       name
//       phone
//       address {
//         street
//         city
//       }
//       id
//     }
//   }
// `;

// client.query({ query }).then((response) => {
//   console.log(response.data);
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
