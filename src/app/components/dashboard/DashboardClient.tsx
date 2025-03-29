"use client";

import TransactionHistory from "../transactions/Transactions";
import { useEffect, useState } from "react";
import { ApiData } from "../../types/transaction";
import { FilterFormData } from "../../types/filterFormData";
import Tabs from "../tabs/Tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { AppLayout } from "../layout/Layout";
import Image from "next/image";
import { useFormattedNumber } from "../../hooks/useFormattedNumber";
import "react-datepicker/dist/react-datepicker.css";
import DateRangeModal from "./DateRangeModal";
import { useDownloadCsv } from "../../hooks/useDowloadCvs";
import FilterSidebar from "../filters/FilterSidebar";
import useFilteredTransactions from "../../hooks/useFilteredTransactionByTab";
// import { SkeletonItems } from "../Skeleton";
import Link from "next/link";
import { applyUrlFilters } from "../../hooks/applyFilters";
import { Button } from "@/app/components/ui/button";

interface DashboardClientProps {
  data: ApiData;

}

export default function DashboardClient({ data }: DashboardClientProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "semanal";

  const [filters, setFilters] = useState<FilterFormData | null>(null);
  const [showSidebarFilters, setShowSidebarFilters] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const filteredTransactionsByTabs = useFilteredTransactions(data, activeTab);

  const { handleDownload } = useDownloadCsv({
    transactions: data?.transactions,
    startDate,
    endDate,
  });

  const handleClearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  // console.log(filteredTransactionsByTabs);
  const finalFilteredTransactions = applyUrlFilters(filteredTransactionsByTabs, filters);

  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const cardsParam = searchParams.getAll("cards");
  const installmentsParam = searchParams.getAll("installments");
  const amountMinParam = searchParams.get("amountMin");
  const amountMaxParam = searchParams.get("amountMax");
  const methodsParam = searchParams.getAll("methods");
  

  useEffect(() => {
    const newFilters = {
      startDate: startDateParam ? new Date(new Date(startDateParam).getTime() + (3 * 60 * 60 * 1000)) : null,
      endDate: endDateParam ? (() => {
        const date = new Date(new Date(endDateParam).getTime() + (3 * 60 * 60 * 1000));
        date.setHours(23, 59, 0, 0); // Establece la hora a 23:59:00
        return date;
      })() : null,
      cards: cardsParam.length > 0 ? cardsParam : [],
      installments: installmentsParam.length > 0 ? installmentsParam : [],
      amountMin: amountMinParam ? Number(amountMinParam) : 0,
      amountMax: amountMaxParam ? Number(amountMaxParam) : 0,
      methods: methodsParam.length > 0 ? methodsParam : [],
    };

    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, [searchParams]);


    const totalAmountFromData = filteredTransactionsByTabs.reduce(
    (sum, tx) => sum + tx.amount,
    0
   );

   const totalAmountParam = searchParams.get("totalAmount");
   const totalAmount = totalAmountParam !== null ? totalAmountParam : totalAmountFromData;


   return (
    <>
      <AppLayout>
        <div className="p-6 flex-1 mx-auto max-3-xl w-full flex flex-col text-center justify-center mt-18">
          <div className="flex justify-between items-center mb-8 ">
            <div className="flex-1">
              <h1 className="text-2xl font-medium text-gray-700">Tus cobros</h1>
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>

          {/* <button
            type="button"
            className="text-red-700 text-sm"
            onClick={clearUrlFilters}
          >
            Limpiar Filtros de URL
          </button> */}

          <div className="mb-8 flex flex-col justify-center text-center mx-auto max-3-xl w-full">
            <h2 className="text-4xl font-medium text-gray-800">
              + ${useFormattedNumber(Number(totalAmount))}
              <span className="text-gray-500 text-2xl"></span>
            </h2>
            <button className="mt-4 flex justify-center items-center text-blue-700 gap-2">
              <Image
                src="/analyze.svg"
                alt="Category Icon"
                width={32}
                height={32}
              />
              <span className="text-[#022A9A]">
                <Link href="/metrics">Ver métricas</Link>
              </span>
            </button>
          </div>

          <div className="flex justify-around items-center align-middle mb-4 w-full">
            <h3 className="text-gray-700 md:ml-4">Historial de transacciones</h3>
            <div className="flex ml-0 gap-2 ">
              <Button variant={"ghost"}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowDatePicker(true)}
              >
                <Image src="/download.svg" alt="Download" width={32} height={32} />
              </Button>

              <Button variant={"ghost"}
                className="p-2 mr-2 cursor-pointer "
                onClick={() => {
                  setShowSidebarFilters(true);
                }}
              >
                <Image
                  src="/filters-button.svg"
                  alt="Category Icon"
                  width={52}
                  height={52}
                />
              </Button>
            </div>
          </div>

          {finalFilteredTransactions.length === 0 ? (
            <div className="flex justify-center mx-auto">
              <p className="mt-2 text-sm">No hay transacciones.</p>
            </div>
          ) : (
            <TransactionHistory transactions={finalFilteredTransactions} />
          )}
        </div>

        {showDatePicker && (
          <DateRangeModal
            isOpen={showDatePicker}
            onClose={() => {
              setShowDatePicker(false);
              setStartDate(undefined);
              setEndDate(undefined);
            }}
            startDate={startDate}
            endDate={endDate}
            onChange={([start, end]) => {
              setStartDate(start || undefined);
              setEndDate(end || undefined);
            }}
            onDownload={() => {
              handleDownload();
              setShowDatePicker(false);
            }}
          />
        )}

        {showSidebarFilters && (
          <div
            className={`fixed inset-y-0 right-0 bg-[#FAFAFA] shadow-2xl z-50 transform transition-transform duration-300 ${
              showSidebarFilters ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <FilterSidebar
              onSetShowFilters={setShowSidebarFilters}
              data={filteredTransactionsByTabs}
              startDate={startDate}
              endDate={endDate}
              onChange={([start, end]) => {
                setStartDate(start || undefined);
                setEndDate(end || undefined);
              }}
              onClear={handleClearDates}
            />
          </div>
        )}
      </AppLayout>
    </>
  );
}
