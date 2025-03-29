import { FilterFormData } from "../types/filterFormData";
import { Transaction } from "../types/transaction";

export const applyUrlFilters = (
  transactions: Transaction[],
  filters: FilterFormData | null
): Transaction[] => {
  if (!filters) return transactions;
  // console.log(filters);
// console.log(transactions)
  return transactions.filter((tx) => {
    let matches = true;
    // Filtrar por tarjetas si se seleccionó alguna
    if (filters.cards.length > 0) {
      matches = matches && filters.cards.includes(tx.card);
    }
    // Filtrar por cuotas
    if (filters.installments.length > 0) {
      matches =
        matches &&
        filters.installments.includes(String(tx.installments));
    }
    // Filtrar por métodos
    if (filters.methods.length > 0) {
      matches = matches && filters.methods.includes(tx.paymentMethod as string);
    }
    // Filtrar por monto/rango
    if (filters.amountMin && filters.amountMax) {
      // console.log(filters.amountMin, filters.amountMax,'ayudamelocoo');
      const minAmount = Number(filters.amountMin);
      const maxAmount = Number(filters.amountMax);
      const txAmount = Number(tx.amount);
      matches = matches && (txAmount >= minAmount && txAmount <= maxAmount);
    }
    // Filtrar por rango de fechas (si se definen ambas fechas)
    if (filters.startDate && filters.endDate) {
      const txDate = new Date(tx.createdAt);
      matches =
        matches &&
        txDate >= filters.startDate &&
        txDate <= filters.endDate;
    }
    return matches;
  });
};
