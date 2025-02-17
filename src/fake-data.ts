import { TData } from "./data-types";

const carrots: TData = {
  id: "carrots",
  label: "Carrots",
  variant: "number",
};

const broccoli: TData = {
  id: "broccoli",
  label: "Broccoli",
  variant: "number",
};

const fresh: TData = {
  id: "fresh",
  label: "Fresh",
  variant: "boolean",
};

const frozen: TData = {
  id: "frozen",
  label: "Frozen",
  variant: "boolean",
};

const available: TData = {
  id: "available",
  label: "Availability",
  variant: "date",
};

export const data: Record<string, TData> = {
  carrots,
  broccoli,
  fresh,
  frozen,
  available,
};
