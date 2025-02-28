import { useQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { createContext, ReactNode, useEffect, useState } from "react";
import { GET_COUNTRIES } from "../api/queries";

interface SearchParams {
  filter?: {
    continent?: { eq: string };
    currency?: { eq: string };
    code?: { eq: string };
  };
}

interface CountriesContextType {
  data: any;
  error: any;
  loading: boolean;
  setSearchParams: (params: SearchParams) => void;
}

export const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

export function CountriesProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const { loading, error, data, refetch } = useQuery(GET_COUNTRIES, {
    variables: searchParams.filter && Object.keys(searchParams.filter).length > 0 ? { filter: searchParams.filter } : {},
  });

  const debouncedRefetch = debounce((params: SearchParams) => {
    refetch(params.filter && Object.keys(params.filter).length > 0 ? { filter: params.filter } : {});
  }, 1500);

  useEffect(() => {
    debouncedRefetch(searchParams);
    return () => debouncedRefetch.cancel();
  }, [searchParams, debouncedRefetch]);

  return (
    <CountriesContext.Provider value={{
      data,
      error,
      loading,
      setSearchParams,
    }}>
      {children}
    </CountriesContext.Provider>
  );
}