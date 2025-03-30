'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ApiData } from "../types/transaction";
import { FilterFormData } from "../types/filterFormData";
import { getTransactions } from "../api/fetchers";

interface DataFilterContextProps {
  data: ApiData | null;
  filters: FilterFormData;
  setData: (data: ApiData) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterFormData>>;
  clearFilters: () => void;
  isLoading: boolean;
}

const DataFilterContext = createContext<DataFilterContextProps | undefined>(undefined);

export const DataFilterProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filters, setFilters] = useState<FilterFormData>({
    startDate: null,
    endDate: null,
    cards: [],
    installments: [],
    amountMin: 0,
    amountMax: 0,
    methods: [],
    tabs: "semanal",
  });

  const clearFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      cards: [],
      installments: [],
      amountMin: 0,
      amountMax: 0,
      methods: [],
      tabs: "semanal",
    });
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const result = await getTransactions();
      if (result) {
        setData(result);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <DataFilterContext.Provider
      value={{ data, filters, setData, setFilters, clearFilters, isLoading }}
    >
      {children}
    </DataFilterContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataFilterContext);
  if (!context) {
    throw new Error("useDataFilter must be used within a DataFilterProvider");
  }
  return context;
};
