"use client";

import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import useOnClickOutside from "@/app/hooks/onMousseEvent";
import { Controller, UseFormReturn } from "react-hook-form";
import { DownloadData } from "@/app/types/filterFormData";
import { useDownloadCsv } from "@/app/hooks/useDowloadCvs";
import { useDataContext } from "@/app/context/DataFilterContext";

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  downloadValues: UseFormReturn<DownloadData>;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({
  downloadValues,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { data } = useDataContext();

  useOnClickOutside(modalRef, () => onClose());

  const { control, getValues, setValue, watch, handleSubmit } = downloadValues;

  const onChange = (dates: [Date | null, Date | null]) => {
    if (dates) {
      setValue("startDate", dates[0]); // Establece el valor de startDate
      setValue("endDate", dates[1]); // Establece el valor de endDate
    }
  };

  const { handleDownload } = useDownloadCsv({
    transactions: data?.transactions || [],
    startDate: watch("startDate") || undefined,
    endDate: watch("endDate") || undefined,
  });


  const onSubmit = (formData: DownloadData) => {
    handleDownload();
    console.log(formData, "formData");
  };

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg p-6 w-[300px]"
      >
        <h2 className="text-center text-[#313643] text-sm font-semibold mb-2">
          Elegí las fechas que querés descargar
        </h2>

        <Controller
          name="startDate"
          control={control}
          render={({ field: { onChange: fieldOnChange } }) => {
            return (
              <DatePicker
                locale={es}
                selected={null}
                onChange={(dates) => {
                  fieldOnChange(dates);
                  onChange(dates);
                }}
                startDate={getValues("startDate")}
                endDate={getValues("endDate")}
                selectsRange
                inline
                calendarStartDay={0}
                dateFormat="dd/MM/yyyy"
                className="w-full"
              />
            );
          }}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="border border-blue-800 text-blue-800 px-4 py-2 rounded-full text-sm"
          >
            Cerrar
          </button>
          <button
            type="submit"
            className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm cursor-pointer"
          >
            Descargar
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default DateRangeModal;
