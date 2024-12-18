import { useEffect, useState } from "react";
import { data as fakeData } from "./fake-data";
import { TData } from "./data-types";
import { FiltersContainer } from "./components/filters-container";
import { TypeAhead } from "./components/type-ahead";
import { useFilters } from "./hooks/use-filters";
import { Chip, ChipLabel } from "./components/chip";
import { ChipForm } from "./components/chip/forms/chip-form";
import {
  BooleanFormBody,
  getItemFromFormData,
  NumbericFormBody,
} from "./components/chip/forms";
import { DateFormBody } from "./components/chip/forms/date-form-body";

function App() {
  const [data, setData] = useState<Record<string, TData>>();
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

  const {
    filters,
    handleAddItem,
    handleUpdateItem,
    handleRemoveItem,
    showResults,
    setShowResults,
    openChip,
    setOpenChip,
  } = useFilters();

  return (
    <div className="space-y-2 p-4">
      <FiltersContainer isLoading={loading}>
        {filters?.map(({ id, values }) => {
          const item = data?.[id];
          if (!item) return null;
          return (
            <Chip
              key={id}
              label={<ChipLabel item={item} values={values} />}
              open={openChip === id}
              toggleOpen={() => setOpenChip(openChip === id ? undefined : id)}
            >
              <ChipForm
                item={item}
                onSubmit={(e) => {
                  const formItem = getItemFromFormData(e, item);
                  if (!formItem) return;
                  handleUpdateItem(formItem);
                  setOpenChip(undefined);
                }}
                onRemove={handleRemoveItem}
                onClose={() => setOpenChip(undefined)}
              >
                {item.variant === "number" ? (
                  <NumbericFormBody
                    defaultValues={{
                      operator: values?.operator,
                      value: Number(values?.value),
                    }}
                  />
                ) : null}
                {item.variant === "boolean" ? (
                  <BooleanFormBody defaultValues={Boolean(values?.value)} />
                ) : null}
                {item.variant === "date" ? (
                  <DateFormBody
                    defaultValues={{
                      operator: values?.operator,
                      value: String(values?.value),
                    }}
                  />
                ) : null}
              </ChipForm>
            </Chip>
          );
        })}
        <TypeAhead
          data={
            data
              ? Object.values(data).filter((datum) =>
                  filters.every((filter) => filter.id !== datum.id)
                )
              : []
          }
          showResults={showResults}
          setShowResults={setShowResults}
          onItemClick={handleAddItem}
        />
      </FiltersContainer>
      {filters.length ? (
        <pre className="bg-gray-200 p-2 rounded">
          {JSON.stringify(filters, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export default App;
