import React from "react";
import { Transaction } from "../../types/transaction";
import TransactionItem from "./TransactionItem";
import { FilterFormData } from "@/app/types/filterFormData";

interface TransactionHistoryProps {
  transactions: Transaction[];
  filters?: FilterFormData | null;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-gray-800">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          No hay resultados que mostrar.
        </h3>
        <p className="text-gray-500">Podés probar usando los filtros.</p>
      </div>
    );
  }

  //  orden por fecha
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4 md:w-2xl max-h-96 w-full overflow-y-auto mx-auto">
      {sortedTransactions.map((tx) => (
        <TransactionItem key={tx.id} tx={tx} />
      ))}
    </div>
  );
};

export default TransactionHistory;
