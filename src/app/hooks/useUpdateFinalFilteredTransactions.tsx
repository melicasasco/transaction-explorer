import {  useMemo } from "react";
import { useDataContext } from "../context/DataFilterContext";
import { Transaction } from "../types/transaction";
import useUpdateFiltersFromSearchParams from "./useUpdateFiltersFromQueryParams";
import { isWithinInterval, parseISO, startOfDay, startOfMonth, startOfWeek } from "date-fns";

interface FinalFilteredTransactions {
  finalFiltered: Transaction[] | undefined
  totalAmount: number;
}

const now = new Date();

// Este hook unifica la actualización de filtros y el filtrado de transacciones
export default function useFinalFilteredTransactions(
  searchParams: URLSearchParams
): FinalFilteredTransactions {
  const { data, filters, setFilters } = useDataContext();

  // Actualizamos los filtros a partir de los search params
  useUpdateFiltersFromSearchParams(searchParams, setFilters);

  // filtro la data de mi context con los filtros provenientes de queryparams
  const finalFiltered = useMemo(() => {
    return data?.transactions.filter((tx) => {
      const txDate = parseISO(tx.createdAt);

      // Filtrado por rango de fechas
      const startDateValue = filters.startDate ? new Date(filters.startDate.setHours(0, 0, 0, 0)) : null;
      const endDateValue = filters.endDate ? new Date(filters.endDate.setHours(23, 59, 59, 999)) : null;

      if (startDateValue && txDate < startDateValue) return false;
      if (endDateValue && txDate > endDateValue) return false;

      // Filtrado por tarjetas
      if (filters.cards.length > 0 && !filters.cards.includes(tx.card)) return false;
      // Filtrado por cuotas
      if (filters.installments.length > 0 && !filters.installments.includes(String(tx.installments))) return false;
      // Filtrado por métodos de pago
      if (filters.methods.length > 0 && !filters.methods.includes(tx.paymentMethod as string)) return false;

      // Filtrado por montos
      // Se aplica el filtro si amountMin o amountMax es mayor a 0
      if (filters.amountMin > 0 && tx.amount < filters.amountMin) return false;
      if (filters.amountMax > 0 && tx.amount > filters.amountMax) return false;

      if (startDateValue === null || startDateValue === undefined) {
        switch (filters.tabs) {
          case "diario": {
            const dayStart = startOfDay(now);
            return isWithinInterval(txDate, { start: dayStart, end: now });
          }
         
          case "mensual": {
            const monthStart = startOfMonth(now);
            return isWithinInterval(txDate, { start: monthStart, end: now });
          }
          
          default: {
            const weekStart = startOfWeek(now, { weekStartsOn: 1 });
            return isWithinInterval(txDate, { start: weekStart, end: now });
          }
        }
      }
      return true;
    });
  }, [data?.transactions, filters]);
  // console.log(finalFiltered,'finalFiltereddddddd')

  const totalAmount = useMemo(() => {
    return (finalFiltered ?? []).reduce((sum, tx) => sum + tx.amount, 0);
  }, [finalFiltered]);
  
  return { finalFiltered, totalAmount };
  
}
