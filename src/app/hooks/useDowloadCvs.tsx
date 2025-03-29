"use client";

import { parseISO } from "date-fns";
import { Transaction } from "../types/transaction";
import { toast } from "sonner";

interface UseDownloadCsvProps {
  transactions: Transaction[];
  startDate?: Date;
  endDate?: Date;
}

export function useDownloadCsv({ transactions, startDate, endDate }: UseDownloadCsvProps) {
// console.log(startDate,'startDateDOWNLOAD');
// console.log(endDate,'endDateDOWNLOAD');
  const handleDownload = () => {
    if (!startDate || !endDate) {
        toast.error("No hay movimientos en las fechas seleccionadas para descargar");

      return;
    }

    // 1. Filtrar transacciones en el rango seleccionado
    const rangeFiltered = transactions.filter((tx) => {
      const dateTx = parseISO(tx.createdAt);
      return dateTx >= startDate && dateTx <= new Date(endDate.getTime() + (23 * 60 * 60 * 1000) + (59 * 60 * 1000)); // Ajuste para incluir hasta las 23:59 del endDate
    });

    // Si no hay transacciones, mostramos un toast y salimos
    if (rangeFiltered.length === 0) {
        toast.error("No hay movimientos en las fechas seleccionadas para descargar");

      return;
    }

    // 2. Generar CSV
    let csv = "id,amount,paymentMethod,createdAt\n";
    for (const tx of rangeFiltered) {
      csv += `${tx.id},${tx.amount},${tx.paymentMethod},${tx.createdAt}\n`;
    }

    // 3. Forzar la descarga del CSV en el navegador
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transacciones.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { handleDownload };
}
