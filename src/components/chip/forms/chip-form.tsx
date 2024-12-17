import { type FormEvent } from "react";
import {
  handleBooleanFormData,
  handleDateFormData,
  handleNumbericFormData,
} from "./form-data-utils";
import { NumbericFormBody } from "./numberic-form-body";
import { BooleanFormBody } from "./boolean-form-body";
import { Button } from "@/components/ui/button";
import { Save, Trash, X } from "lucide-react";
import { TData, TFilter } from "@/data-types";
import { DateFormBody } from "./date-form-body";

export const ChipForm = ({
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
    const getValues = {
      number: handleNumbericFormData,
      boolean: handleBooleanFormData,
      date: handleDateFormData,
    }[item.variant];
    const values = getValues?.(formData);
    if (!values) return;
    onSubmit({ id: item.id, ...values });
    onClose();
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
      {item.variant === "number" ? (
        <NumbericFormBody
          defaultValues={{
            operator: defaultValues?.operator,
            value: Number(defaultValues?.value),
          }}
        />
      ) : null}
      {item.variant === "boolean" ? (
        <BooleanFormBody defaultValues={Boolean(defaultValues?.value)} />
      ) : null}
      {item.variant === "date" ? (
        <DateFormBody
          defaultValues={{
            operator: defaultValues?.operator,
            value: String(defaultValues?.value),
          }}
        />
      ) : null}
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
