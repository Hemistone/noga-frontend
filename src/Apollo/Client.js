import ApolloClient from "apollo-boost";

export default new ApolloClient({
  connectToDevTools: true,
  uri: "http://localhost:4000/graphql"
});
