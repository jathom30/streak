export type TData = {
  id: string;
  label: string;
  variant: string;
};

export type TFilter = {
  id: string;
  values?: {
    operator?: string;
    value: number | boolean | string | string[];
  };
};
