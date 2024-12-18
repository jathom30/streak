import { TData } from "@/data-types";
import { FormEvent } from "react";

const handleBooleanFormData = (data: FormData) => {
  return { value: data.get("value") === "true" };
};

const handleNumbericFormData = (data: FormData) => {
  return {
    operator: String(data.get("operator")),
    value: Number(data.get("value")),
  };
};

const handleDateFormData = (data: FormData) => {
  return {
    operator: String(data.get("operator")),
    value: String(data.get("value")),
  };
};

export const getItemFromFormData = (
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

export const operators: Record<string, string> = {
  equals: "Equals (=)",
  "not-equals": "Not Equals (!=)",
  "less-than": "Less than (<)",
  "less-than-or-equals-to": "Less than or equals to (<=)",
  "greater-than": "Greater than (>)",
  "greater-than-or-equals-to": "Greater than or equals to (>=)",
};

export const operatorsShorthand: Record<string, string> = {
  equals: "=",
  "not-equals": "!=",
  "less-than": "<",
  "less-than-or-equals-to": "<=",
  "greater-than": ">",
  "greater-than-or-equals-to": ">=",
  before_date: "before",
  on_date: "on",
  after_date: "after",
};
