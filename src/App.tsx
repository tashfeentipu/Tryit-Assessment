import { ApolloProvider } from "@apollo/client";
import { client } from "./api/apolloClient";
import { CountriesTable } from "./components/countriesTable";
import { SearchFilters } from "./components/searchFilters";
import { CountriesProvider } from "./context/CountriesContext";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <CountriesProvider>
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold mb-4">Countries Table</h1>
          <SearchFilters />
          <CountriesTable />
        </div>
      </CountriesProvider>
    </ApolloProvider>
  );
}
