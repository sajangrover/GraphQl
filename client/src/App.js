import React from 'react';
import MovieList from './Components/MovieList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import ActorList from './Components/ActorList';
import AddMovie from './Components/AddMovie';


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})
class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>GraphQL Tutorial</h1>
          <MovieList />
          <AddMovie/>
          <ActorList />
        </div>
      </ApolloProvider>
    )
  };
}

export default App;
