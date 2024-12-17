export type TData = {
  id: string;
  label: string;
  variant: string;
  options?: string[];
};

export type TFilter = {
  id: string;
  operator?: string;
  value: number | boolean | string | string[];
};
