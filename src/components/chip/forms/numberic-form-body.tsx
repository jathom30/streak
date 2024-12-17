import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { operators } from "./form-data-utils";

export const NumbericFormBody = ({
  defaultValues,
}: {
  defaultValues: {
    operator?: string;
    value?: number;
  };
}) => {
  return (
    <>
      <Select required defaultValue={defaultValues.operator} name="operator">
        <SelectTrigger>
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(operators).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        required
        defaultValue={String(defaultValues.value)}
        type="number"
        name="value"
        placeholder="numberic value"
      />
    </>
  );
};
