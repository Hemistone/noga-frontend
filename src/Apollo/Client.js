import ApolloClient from "apollo-boost";

export default new ApolloClient({
  connectToDevTools: true,
  uri: "https://nogaad-backend.herokuapp.com/graphql"
});
