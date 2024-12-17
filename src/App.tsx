import { useState } from "react";
import { data } from "./fake-data";
import { useFilterResults } from "./hooks/use-filter-results";
import { Chip, ChipLabel } from "./components/chip";
import { ChipForm } from "./components/chip/forms/chip-form";
import { Button } from "./components/ui/button";
import { useClickOutside } from "./hooks/use-click-outside";
import { TFilter } from "./data-types";
import { CustomChipForm } from "./components/chip/custom-chip-form";
import { CustomChipLabel } from "./components/chip/custom-chip-label";

function App() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<TFilter[]>([]);
  const [tempFilterKey, setTempFilterKey] = useState<string>();
  const tempItem = tempFilterKey ? data[tempFilterKey] : undefined;

  const handleRemove = (id: string) => {
    setFilters((prev) => prev.filter((item) => item.id !== id));
  };

  const {
    query,
    setQuery,
    filtered: filteredData,
  } = useFilterResults({
    filterables: Object.values(data).filter((datum) =>
      filters.every((filter) => filter.id !== datum.id)
    ),
    conditions: [
      (q, item) => item.label.toLowerCase().includes(q.toLowerCase()),
    ],
  });

  const outsideRef = useClickOutside<HTMLUListElement>(() => setOpen(false));

  return (
    <div className="space-y-2 p-4">
      <div className="flex flex-wrap gap-1 items-center border p-1 rounded">
        {filters?.map((filter) => {
          const item = data[filter.id];
          return (
            <Chip
              key={filter.id}
              label={
                item.variant === "string-array" ? (
                  <CustomChipLabel item={item} values={filter} />
                ) : (
                  <ChipLabel item={item} values={filter} />
                )
              }
            >
              {({ onClose }) => {
                if (item.variant === "string-array") {
                  return (
                    <CustomChipForm
                      item={item}
                      defaultValues={filter}
                      onSubmit={(data) => {
                        setFilters((prev) => {
                          return prev.map((item) => {
                            if (item.id === data.id) {
                              return data;
                            }
                            return item;
                          });
                        });
                      }}
                      onRemove={handleRemove}
                      onClose={onClose}
                    />
                  );
                }
                return (
                  <ChipForm
                    item={item}
                    defaultValues={filter}
                    onSubmit={(data) => {
                      setFilters((prev) => {
                        return prev.map((item) => {
                          if (item.id === data.id) {
                            return data;
                          }
                          return item;
                        });
                      });
                    }}
                    onRemove={handleRemove}
                    onClose={onClose}
                  />
                );
              }}
            </Chip>
          );
        })}
        {tempItem ? (
          <Chip defaultOpen label={<ChipLabel item={data[tempItem.id]} />}>
            {({ onClose }) => {
              if (tempItem.variant === "string-array") {
                return (
                  <CustomChipForm
                    item={tempItem}
                    onSubmit={(data) => {
                      setFilters((prev) => [...prev, data]);
                      setTempFilterKey(undefined);
                    }}
                    onRemove={() => setTempFilterKey(undefined)}
                    onClose={() => {
                      setTempFilterKey(undefined);
                      onClose();
                    }}
                  />
                );
              }
              return (
                <ChipForm
                  item={tempItem}
                  onSubmit={(data) => {
                    setFilters((prev) => [...prev, data]);
                    setTempFilterKey(undefined);
                  }}
                  onRemove={() => setTempFilterKey(undefined)}
                  onClose={() => {
                    setTempFilterKey(undefined);
                    onClose();
                  }}
                />
              );
            }}
          </Chip>
        ) : null}
        <div className="relative">
          <input
            value={query}
            className="px-1 focus:outline-none"
            placeholder="Filter by..."
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
          />
          {open || query.length ? (
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
                        setTempFilterKey(datum.id);
                        setOpen(false);
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
      </div>
      {filters.length ? (
        <pre className="bg-gray-200 p-2 rounded">
          {JSON.stringify(filters, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export default App;
