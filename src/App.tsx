import { useEffect, useState } from "react";
import { data as fakeData } from "./fake-data";
import { TData, TFilter } from "./data-types";
import { Filters } from "./components/filters";

function App() {
  const [data, setData] = useState<Record<string, TData>>();
  const [filters, setFilters] = useState<TFilter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fakeFetch = async () => {
      // 500ms timeout to simulate async fetch
      await new Promise((resolve) => setTimeout(resolve, 500));
      setData(fakeData);
      setLoading(false);
    };
    fakeFetch();
  }, []);

  return (
    <div className="space-y-2 p-4">
      <Filters
        isLoading={loading}
        filters={filters}
        onFilterChange={setFilters}
        data={data}
      />
      {filters.length ? (
        <pre className="bg-gray-200 p-2 rounded">
          {JSON.stringify(filters, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export default App;
