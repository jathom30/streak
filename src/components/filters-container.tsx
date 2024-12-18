import { type ReactNode } from "react";
import { Loader } from "lucide-react";

export const FiltersContainer = ({
  isLoading,
  children,
}: {
  isLoading?: boolean;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-wrap gap-1 items-center border p-1 rounded">
      {isLoading ? (
        <div className="animate-spin">
          <Loader size={15} />
        </div>
      ) : null}
      {children}
    </div>
  );
};
