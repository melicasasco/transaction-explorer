import { useEffect } from "react";
import { FilterFormData } from "../types/filterFormData";

const useUpdateFiltersFromSearchParams = (
  searchParams: URLSearchParams,
  setFilters: React.Dispatch<React.SetStateAction<FilterFormData>>
) => {
  useEffect(() => {
    const newFilters = {
      startDate: searchParams.get("startDate")
        ? new Date(
            new Date(searchParams.get("startDate") as string).getTime() +
              3 * 60 * 60 * 1000
          )
        : null,
      endDate: searchParams.get("endDate")
        ? (() => {
            const date = new Date(
              new Date(searchParams.get("endDate") as string).getTime() +
                3 * 60 * 60 * 1000
            );
            date.setHours(23, 59, 0, 0);
            return date;
          })()
        : null,
      cards:
        searchParams.getAll("cards").length > 0
          ? searchParams.getAll("cards")
          : [],
      installments:
        searchParams.getAll("installments").length > 0
          ? searchParams.getAll("installments")
          : [],
      amountMin: searchParams.get("amountMin")
        ? Number(searchParams.get("amountMin"))
        : 0,
      amountMax: searchParams.get("amountMax")
        ? Number(searchParams.get("amountMax"))
        : 0,
      methods:
        searchParams.getAll("methods").length > 0
          ? searchParams.getAll("methods")
          : [],
      tabs: searchParams.get("tab")
        ? searchParams.get("tab")
         : 'semanal',
    };

    setFilters((prev: FilterFormData | null) => ({
      ...prev,
      ...newFilters,
    }));
    // console.log(newFilters,'newFilters')
  }, [searchParams, setFilters]);
};

export default useUpdateFiltersFromSearchParams;
