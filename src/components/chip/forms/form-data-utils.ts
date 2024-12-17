export const handleBooleanFormData = (data: FormData) => {
  return { value: data.get("value") === "true" };
};

export const handleNumbericFormData = (data: FormData) => {
  return {
    operator: String(data.get("operator")),
    value: Number(data.get("value")),
  };
};

export const handleDateFormData = (data: FormData) => {
  return {
    operator: String(data.get("operator")),
    value: String(data.get("value")),
  };
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
