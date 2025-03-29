"use client"

import React, { useRef } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { es } from "date-fns/locale";
import useOnClickOutside from "@/app/hooks/onMousseEvent";

interface DateRangeModalProps {
  startDate: Date | undefined
  endDate: Date | undefined
  isOpen: boolean
  onChange: (dates: [Date | null, Date | null]) => void
  onClose: () => void
  onDownload: () => void
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({
  startDate,
  endDate,
  onChange,
  onClose,
  onDownload,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
// console.log(startDate,'startDateeee');
// console.log(endDate,'endDateeeee');
  useOnClickOutside(modalRef, () => onClose());

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-lg p-6 w-[300px]">
        <h2 className="text-center text-[#313643] text-sm font-semibold mb-2">
          Elegí las fechas que querés descargar
        </h2>

        <DatePicker
          locale={es}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          calendarStartDay={0}
          dateFormat="dd/MM/yyyy"
          className="w-full"
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="border border-blue-800 text-blue-800 px-4 py-2 rounded-full text-sm"
          >
            Cerrar
          </button>
          <button
            onClick={onDownload}
            className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DateRangeModal;
