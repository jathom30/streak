import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { type ReactNode, useState } from "react";

export const Chip = ({
  defaultOpen = false,
  label,
  children,
}: {
  defaultOpen?: boolean;
  label: ReactNode;
  children: ({ onClose }: { onClose: () => void }) => ReactNode;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Badge variant="outline">
          {label}
          <ChevronDown className="ml-2 w-4" />
        </Badge>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start">
        {children({ onClose: () => setOpen(false) })}
      </PopoverContent>
    </Popover>
  );
};
