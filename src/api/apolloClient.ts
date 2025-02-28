import { ApolloClient, InMemoryCache } from "@apollo/client";

const baseURL = "https://countries.trevorblades.com/graphql"

export const client = new ApolloClient({
    uri: baseURL,
    cache: new InMemoryCache(),
});