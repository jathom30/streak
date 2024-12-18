import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DateFormBody = ({
  defaultValues,
}: {
  defaultValues?: {
    operator?: string;
    value?: string;
  };
}) => {
  return (
    <>
      <Select required defaultValue={defaultValues?.operator} name="operator">
        <SelectTrigger>
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="before_date">Before date</SelectItem>
          <SelectItem value="on_date">On date</SelectItem>
          <SelectItem value="after_date">After date</SelectItem>
        </SelectContent>
      </Select>
      <Input
        defaultValue={String(defaultValues?.value)}
        type="date"
        name="value"
      />
    </>
  );
};
