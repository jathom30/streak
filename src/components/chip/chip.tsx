import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { type ReactNode } from "react";

export const Chip = ({
  open,
  toggleOpen,
  label,
  children,
}: {
  open: boolean;
  toggleOpen: () => void;
  label: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger>
        <Badge variant="outline">
          {label}
          <ChevronDown className="ml-2 w-4" />
        </Badge>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start">
        {children}
      </PopoverContent>
    </Popover>
  );
};
