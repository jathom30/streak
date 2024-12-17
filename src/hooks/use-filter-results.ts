import { useState } from "react";

export const useFilterResults = <T>({
  filterables,
  conditions,
  query,
}: {
  filterables: T[];
  conditions: ((q: string, item: T) => boolean)[];
  query?: string;
}) => {
  const [internalQuery, setInternalQuery] = useState("");

  const q = query || internalQuery;

  const itemMatchesConditions = (filterable: T) => {
    if (!q.length) return true;
    return conditions.some((condition) => condition(q, filterable));
  };

  const filtered = filterables.filter(itemMatchesConditions);

  return {
    filtered,
    setQuery: setInternalQuery,
    query: q,
  };
};
