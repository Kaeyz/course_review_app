import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


import CourseList from "./components/CourseList";
import Add from "./components/Add";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Kaeyz's Course List and Reviews</h1>
        <CourseList />
        <Add />
      </div>
    </ApolloProvider>
  );
}

export default App;