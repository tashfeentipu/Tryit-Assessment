import { useContext, useState } from "react";
import { CountriesContext } from "../context/CountriesContext";
import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { Pagination } from "./pagination";

type Country = {
  code: string;
  name: string;
  capital: string;
  currency: string;
  emoji: string;
}

export function CountriesTable() {
  const context = useContext(CountriesContext);
  if (!context) throw new Error("CountriesTable must be used within a CountriesProvider");
  const { data, loading, error } = context;
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const paginatedCountries = data?.countries.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Code</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Capital</th>
            <th className="border p-2">Currency</th>
          </tr>
        </thead>
        <tbody>
          <LoadingComponent isLoading={loading} />
          <ErrorComponent message={error?.message} />
          {paginatedCountries?.map(({ code, name, capital, currency, emoji }: Country) => (
            <tr key={code} className="border">
              <td className="border p-2 w-[10%]">{code}</td>
              <td className="border p-2 w-[30%]">{name} {emoji}</td>
              <td className="border p-2 w-[30%]">{capital}</td>
              <td className="border p-2 w-[30%]">{currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        setPage={(page: number) => {
          if (page < 1) {
            return;
          }
          setPage(page)
        }}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        dataLength={data?.countries.length || 0}
      />
    </div>
  );
}
