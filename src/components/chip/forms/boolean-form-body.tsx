import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BooleanFormBody = ({
  defaultValues,
}: {
  defaultValues?: boolean;
}) => {
  return (
    <>
      <Select
        required
        defaultValue={defaultValues ? "true" : "false"}
        name="value"
      >
        <SelectTrigger>
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">True</SelectItem>
          <SelectItem value="false">False</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
