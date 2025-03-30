"use client";

import TransactionHistory from "../transactions/Transactions";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppLayout } from "../layout/Layout";
import Image from "next/image";
import { useFormattedNumber } from "../../hooks/useFormattedNumber";
import "react-datepicker/dist/react-datepicker.css";
import DateRangeModal from "./DateRangeModal";
import FilterSidebar from "../filters/FilterSidebar";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import Tabs from "../tabs/Tabs";
import { Loader2 } from "lucide-react";
import useFinalFilteredTransactions from "@/app/hooks/useUpdateFinalFilteredTransactions";
import { DownloadData } from "@/app/types/filterFormData";
import { useForm } from "react-hook-form";

export default function DashboardClient() {
  const searchParams = useSearchParams();

  const { finalFiltered, totalAmount } = useFinalFilteredTransactions(searchParams);

  const downloadValues = useForm<DownloadData>({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  })

  const initialTab = searchParams.get("tab") || "semanal";

  const [showSidebarFilters, setShowSidebarFilters] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // const totalAmountFromData = filteredTransactionsByTabs.reduce((sum, tx) => sum + tx.amount, 0);
  // const totalAmountParam = searchParams.get("totalAmount");
  // const totalAmount = totalAmountParam !== null ? totalAmountParam : totalAmountFromData;
  const formattedTotalAmount = useFormattedNumber(Number(totalAmount)); 

  if (!finalFiltered) return <div><Loader2 /></div>;

  return (
    <>
      <AppLayout>
        <div className="p-3 md:p-6 flex-1 mx-auto max-3-xl w-full flex flex-col text-center justify-center mt-18">
          <div className="flex justify-between items-center mb-8 ">
            <div className="flex-1">
              <h1 className="text-2xl font-medium text-gray-700">Tus cobros</h1>
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>

          <div className="mb-8 flex flex-col justify-center text-center mx-auto max-3-xl w-full">
            <h2 className="text-4xl font-medium text-gray-800">
              + ${formattedTotalAmount}
              <span className="text-gray-500 text-2xl"></span>
            </h2>
            <button className="mt-4 flex justify-center items-center text-blue-700 gap-2">
              <Image src="/analyze.svg" alt="Category Icon" width={32} height={32} />
              <span className="text-[#022A9A]">
                <Link href="/metrics">Ver métricas</Link>
              </span>
            </button>
          </div>

          <div className="flex justify-around items-center align-middle mb-4 w-full">
            <h3 className="text-gray-700 w-24 md:whitespace-nowrap md:ml-4 md:text-md text-sm text-left">
              Historial de transacciones
            </h3>
            <div className="flex ml-0 gap-2 ">
              <Button
                variant={"ghost"}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowDatePicker(true)}
              >
                <Image src="/download.svg" alt="Download" width={32} height={32} />
              </Button>

              <Button
                variant={"ghost"}
                className="p-2 mr-2 cursor-pointer "
                onClick={() => {
                  setShowSidebarFilters(true);
                }}
              >
                <Image src="/filters-button.svg" alt="Category Icon" width={52} height={52} />
              </Button>
            </div>
          </div>

          {finalFiltered.length === 0 ? (
            <div className="flex justify-center mx-auto">
              <p className="mt-2 text-sm">No hay transacciones.</p>
            </div>
          ) : (
            <TransactionHistory transactions={finalFiltered} />
          )}
        </div>

        {showDatePicker && (
          <DateRangeModal
            isOpen={showDatePicker}
            onClose={() => {
              setShowDatePicker(false);
            }}
            downloadValues={downloadValues}
            onDownload={() => {
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
             />
          </div>
        )}
      </AppLayout>
    </>
  );
}
