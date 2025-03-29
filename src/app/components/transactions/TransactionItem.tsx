import React from "react";
import Image from "next/image";
import { Transaction } from "../../types/transaction";
import { useFormattedDate } from "../../hooks/formatedDate";

interface TransactionItemProps {
  tx: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ tx }) => {
  const formattedDate = useFormattedDate(tx.createdAt, "dd/MM/yyyy");

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-3 mr-6">
        <Image
          src="/category-stores-in.svg"
          alt="Category Icon"
          width={32}
          height={32}
        />
        <div className="text-left">
          <p className="text-gray-800 font-bold first-letter:uppercase">
            {tx.paymentMethod}
          </p>
          <p className="text-sm text-gray-500">Venta</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[#1C8367] font-semibold">
          + ${tx.amount.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
