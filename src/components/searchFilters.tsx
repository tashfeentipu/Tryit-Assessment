import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import { GET_CONTINENTS } from "../api/queries";
import { CountriesContext } from "../context/CountriesContext";

interface SearchFormValues {
  searchType: "continent_currency" | "country_code";
  continent?: string;
  currency?: string;
  countryCode?: string;
}

const filterBuilders = {
  country_code: ({ countryCode }: Partial<SearchFormValues>) => {
    if (!countryCode) return undefined;
    return ({ code: { eq: countryCode } })
  },
  continent_currency: ({ continent, currency }: Partial<SearchFormValues>) => {
    if (!continent && !currency) return undefined
    return ({
      ...continent && { continent: { eq: continent } },
      ...currency && { currency: { eq: currency } },
    })
  },
};

export function SearchFilters() {
  const context = useContext(CountriesContext);
  if (!context) throw new Error("SearchFilters must be used within a CountriesProvider");
  const { setSearchParams } = context;
  const { register, watch } = useForm<SearchFormValues>({ defaultValues: { searchType: "continent_currency" } });
  const searchType = watch("searchType");

  const { data: continentsData } = useQuery(GET_CONTINENTS);

  useEffect(() => {
    const subscription = watch((values) => {
      const { searchType } = values
      const filter = filterBuilders[searchType || "continent_currency"](values)
      if(!filter) return;
      
      setSearchParams(
        { filter: filterBuilders[searchType || "continent_currency"](values)},
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, setSearchParams]);

  return (
    <form className="mb-4">
      <div className="flex items-center sm:flex-row flex-col gap-4 mt-2">
        <label className="md:w-[50%]" >
          <input type="radio" className="mr-2" value="continent_currency" {...register("searchType")} />
          Search by Continent & Currency Code
        </label>
        <div className="flex gap-4 sm:w-[50%] w-full sm:flex-row flex-col justify-between">

          <select
            {...register("continent")}
            disabled={!(searchType === "continent_currency")}
            className={`p-2 border w-[100%] sm:w-[49%] rounded-md transition-opacity ${searchType === "continent_currency" ? "opacity-100" : "opacity-50"}`}
          >
            <option value="">All Continents</option>
            {continentsData?.continents.map((continent: { code: string, name: string }) => (
              <option key={continent.code} value={continent.code}>{continent.name}</option>
            ))}
          </select>
          <input
            type="text"
            {...register("currency")}
            placeholder="Currency Code"
            className={`p-2 border w-[100%] sm:w-[49%] rounded-md transition-opacity ${searchType === "continent_currency" ? "opacity-100" : "opacity-50"}`}
            disabled={!(searchType === "continent_currency")}
          />
        </div>
      </div>
      <div className="flex items-center sm:flex-row flex-col gap-4 mt-2" >
        <label className="md:w-[50%]" >
          <input className="mr-2" type="radio" value="country_code" {...register("searchType")} />
          Search by Country Code
        </label>
        <input
          type="text"
          placeholder="Country Code"
          {...register("countryCode")}
          className={`p-2 border rounded-md w-[100%] sm:w-[50%] transition-opacity ${searchType === "country_code" ? "opacity-100" : "opacity-50"}`}
          disabled={!(searchType === "country_code")}
        />
      </div>
    </form>
  );
}