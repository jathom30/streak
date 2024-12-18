import { ReactNode, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Save, Trash, X } from "lucide-react";
import { TData } from "@/data-types";

export const ChipForm = ({
  item,
  children,
  onSubmit,
  onRemove,
  onClose,
}: {
  item: TData;
  children: ReactNode;
  onSubmit: (data: FormEvent<HTMLFormElement>) => void;
  onRemove: (key: string) => void;
  onClose: () => void;
}) => {
  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <div className="flex items-center gap-2 justify-between">
        <h6 className="font-bold">{item.label}</h6>
        <Button onClick={onClose} size="icon" variant="ghost">
          <X />
        </Button>
      </div>
      {children}
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
