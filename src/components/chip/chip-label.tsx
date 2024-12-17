import { TData, TFilter } from "@/data-types";
import { operatorsShorthand } from "./forms";

const isDayFirstLocale = () => {
  const formatter = new Intl.DateTimeFormat(navigator.language || "en-US");
  const testDate = new Date(Date.UTC(2000, 1, 15)); // year, month, day
  const parts = formatter.formatToParts(testDate);
  return parts[0].type === "day";
};

const getFormattedDate = (dateStr: string) => {
  const [first, second, third] = dateStr.split(/[-/]/);
  if (isDayFirstLocale()) {
    return `${third}/${second}/${first}`;
  }
  return `${second}/${third}/${first}`;
};

export const ChipLabel = ({
  item,
  values,
}: {
  item: TData;
  values?: TFilter;
}) => {
  if (!values) {
    return (
      <div>
        {item.label} <span className="text-red-500">(incomplete)</span>
      </div>
    );
  }
  switch (item.variant) {
    case "date":
      return (
        <div>
          {item.label}{" "}
          {typeof values?.operator === "string"
            ? operatorsShorthand[values.operator]
            : null}{" "}
          {getFormattedDate(String(values?.value))}
        </div>
      );
    case "boolean":
      return (
        <div>
          {values?.value ? (
            <span className="text-green-500">Is</span>
          ) : (
            <span className="text-orange-500">Is not</span>
          )}{" "}
          {item.label}
        </div>
      );
    case "number":
      return (
        <div>
          {item.label}{" "}
          {typeof values?.operator === "string"
            ? operatorsShorthand[values.operator]
            : null}{" "}
          {values?.value}
        </div>
      );
    default:
      return null;
  }
};
