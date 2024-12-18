import { TFilter } from "@/data-types";
import { useState } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState<TFilter[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [openChip, setOpenChip] = useState<string>();

  const handleRemoveItem = (id: string) => {
    setFilters((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (data: TFilter) => {
    setFilters((prev) => {
      return prev.map((item) => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      });
    });
  };

  const handleAddItem = (data: TFilter) => {
    setFilters((prev) => [...prev, data]);
    setOpenChip(data.id);
    setShowResults(false);
  };

  return {
    filters,
    showResults,
    setShowResults,
    openChip,
    setOpenChip,
    handleRemoveItem,
    handleUpdateItem,
    handleAddItem,
  };
};
