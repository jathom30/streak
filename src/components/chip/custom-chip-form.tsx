import { Save, Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import { TData, TFilter } from "@/data-types";
import { FormEvent } from "react";
import { Checkbox } from "../ui/checkbox";

export const CustomChipForm = ({
  item,
  defaultValues,
  onSubmit,
  onRemove,
  onClose,
}: {
  item: TData;
  defaultValues?: TFilter;
  onSubmit: (data: TFilter) => void;
  onRemove: (key: string) => void;
  onClose: () => void;
}) => {
  const handleSubmit = (data: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(data.currentTarget);
    const values = formData.getAll("option").map(String);
    onSubmit({ id: item.id, value: values });
    onClose();
  };

  const isChecked = (option: string) => {
    if (!Array.isArray(defaultValues?.value)) return false;
    return defaultValues?.value.includes(option);
  };
  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <div className="flex items-center gap-2 justify-between">
        <h6 className="font-bold">{item.label}</h6>
        <Button onClick={onClose} size="icon" variant="ghost">
          <X />
        </Button>
      </div>
      {item.options?.map((option) => (
        <label
          key={option}
          htmlFor={option}
          className="text-sm flex items-center gap-2"
        >
          <Checkbox
            name="option"
            id={option}
            defaultChecked={isChecked(option)}
            value={option}
          />
          {option}
        </label>
      ))}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => onRemove(item.id)}
        >
          <Trash className="mr-2" />
          Remove
        </Button>
        <Button type="submit">
          <Save className="mr-2" />
          Apply
        </Button>
      </div>
    </form>
  );
};
