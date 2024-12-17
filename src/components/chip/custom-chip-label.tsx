import type { TData, TFilter } from "@/data-types";

export const CustomChipLabel = ({
  item,
  values,
}: {
  item: TData;
  values?: TFilter;
}) => {
  if (item.variant !== "string-array" || !Array.isArray(values?.value)) {
    return null;
  }
  return (
    <div>
      {item.label}: {values?.value.join(", ")}
    </div>
  );
};
