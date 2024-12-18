import { TData, TFilter } from "@/data-types";
import { Chip, ChipLabel } from "./chip";
import { ChipForm } from "./chip/forms/chip-form";
import { type FormEvent, type SetStateAction, useState } from "react";
import {
  BooleanFormBody,
  handleBooleanFormData,
  handleDateFormData,
  handleNumbericFormData,
  NumbericFormBody,
} from "./chip/forms";
import { DateFormBody } from "./chip/forms/date-form-body";
import { useFilterResults } from "@/hooks/use-filter-results";
import { useClickOutside } from "@/hooks/use-click-outside";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

export const Filters = ({
  filters,
  onFilterChange,
  isLoading,
  data,
}: {
  filters: TFilter[];
  onFilterChange: (value: SetStateAction<TFilter[]>) => void;
  isLoading?: boolean;
  data?: Record<string, TData>;
}) => {
  const [open, setOpen] = useState(false);
  const [openChip, setOpenChip] = useState<string>();
  const {
    query,
    setQuery,
    filtered: filteredData,
  } = useFilterResults({
    filterables: data
      ? Object.values(data).filter((datum) =>
          filters.every((filter) => filter.id !== datum.id)
        )
      : [],
    conditions: [
      (q, item) => item.label.toLowerCase().includes(q.toLowerCase()),
    ],
  });

  const handleRemove = (id: string) => {
    onFilterChange((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (data: TFilter) => {
    onFilterChange((prev) => {
      return prev.map((item) => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      });
    });
  };

  const handleAddItem = (data: TFilter) => {
    onFilterChange((prev) => [...prev, data]);
    setOpenChip(data.id);
    setOpen(false);
    setQuery("");
  };

  const getItemFromFormData = (
    data: FormEvent<HTMLFormElement>,
    item: TData
  ) => {
    const formData = new FormData(data.currentTarget);
    const getValues = {
      number: handleNumbericFormData,
      boolean: handleBooleanFormData,
      date: handleDateFormData,
    }[item.variant];
    const values = getValues?.(formData);
    if (!values) return;
    return { id: item.id, values };
  };

  const outsideRef = useClickOutside<HTMLUListElement>(() => setOpen(false));

  return (
    <div className="flex flex-wrap gap-1 items-center border p-1 rounded">
      {isLoading ? (
        <div className="animate-spin">
          <Loader size={15} />
        </div>
      ) : null}
      {filters?.map(({ id, values }) => {
        const item = data?.[id];
        if (!item) return null;
        return (
          <Chip
            key={id}
            label={<ChipLabel item={item} values={values} />}
            open={openChip === id}
            setOpen={(open) => setOpenChip(open ? id : undefined)}
          >
            <ChipForm
              item={item}
              onSubmit={(e) => {
                const formItem = getItemFromFormData(e, item);
                if (!formItem) return;
                handleUpdateItem(formItem);
                setOpenChip(undefined);
              }}
              onRemove={handleRemove}
              onClose={() => setOpenChip(undefined)}
            >
              {item.variant === "number" ? (
                <NumbericFormBody
                  defaultValues={{
                    operator: values?.operator,
                    value: Number(values?.value),
                  }}
                />
              ) : item.variant === "boolean" ? (
                <BooleanFormBody defaultValues={Boolean(values?.value)} />
              ) : item.variant === "date" ? (
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
                      handleAddItem({ id: datum.id });
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
  );
};
