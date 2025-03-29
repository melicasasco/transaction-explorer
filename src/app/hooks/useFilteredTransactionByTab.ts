import { useEffect, useState } from "react";
import { ApiData, Transaction } from "../types/transaction";
import { isWithinInterval, parseISO, startOfDay, startOfMonth, startOfWeek } from "date-fns";

//  hook para obtener transacciones filtradas x tab
export default function useFilteredTransactions(data: ApiData, activeTab: string) {
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]); 
  
    useEffect(() => {
      if (!data?.transactions) {
        setFilteredTransactions([]);
        return;
      }
  
      const now = new Date();
      const transactions = data.transactions;
  
      let filtered: Transaction[] = []; // 
      
      switch (activeTab) {
        case "diario": {
          const dayStart = startOfDay(now);
          filtered = transactions.filter((tx) => {
            const txDate = parseISO(tx.createdAt);
            return isWithinInterval(txDate, { start: dayStart, end: now });
          });
          break;
        }
        case "semanal": {
          const weekStart = startOfWeek(now, { weekStartsOn: 1 });
          filtered = transactions.filter((tx) => {
            const txDate = parseISO(tx.createdAt);
            return isWithinInterval(txDate, { start: weekStart, end: now });
          });
          break;
        }
        case "mensual": {
          const monthStart = startOfMonth(now);
          filtered = transactions.filter((tx) => {
            const txDate = parseISO(tx.createdAt);
            return isWithinInterval(txDate, { start: monthStart, end: now });
          });
          break;
        }
        default:
          filtered = transactions;
      }
  
      setFilteredTransactions(filtered);
    }, [data, activeTab]);
  
    return filteredTransactions;
  }