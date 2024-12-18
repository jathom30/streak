import { TData, TFilter } from "@/data-types";
import { useClickOutside } from "@/hooks/use-click-outside";
import { Button } from "./ui/button";
import { useFilterResults } from "@/hooks/use-filter-results";

export const TypeAhead = ({
  data,
  showResults,
  setShowResults,
  onItemClick,
}: {
  data: TData[];
  showResults: boolean;
  setShowResults: (val: boolean) => void;
  onItemClick: (item: TFilter) => void;
}) => {
  const outsideRef = useClickOutside<HTMLUListElement>(() =>
    setShowResults(false)
  );

  const {
    query,
    setQuery,
    filtered: filteredData,
  } = useFilterResults({
    filterables: data || [],
    conditions: [
      (q, item) => item.label.toLowerCase().includes(q.toLowerCase()),
    ],
  });

  return (
    <div className="relative">
      <input
        value={query}
        className="px-1 focus:outline-none"
        placeholder="Filter by..."
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowResults(true)}
      />
      {showResults || query.length ? (
        <ul
          className="absolute flex flex-col border rounded bg-white top-[calc(100%+6px)] -left-1 min-w-40"
          ref={outsideRef}
        >
          {filteredData?.length ? (
            filteredData.map((datum) => (
              <li key={datum.id} className="w-full">
                <Button
                  variant="ghost"
                  className="justify-start w-full"
                  onClick={() => {
                    onItemClick({ id: datum.id });
                    setQuery("");
                  }}
                >
                  {datum.label}
                </Button>
              </li>
            ))
          ) : (
            <p className="p-2">No items found...</p>
          )}
        </ul>
      ) : null}
    </div>
  );
};
