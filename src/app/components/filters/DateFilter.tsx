"use client"

import { Controller, UseFormReturn } from "react-hook-form"
import DatePicker from "react-datepicker"
import { es } from "date-fns/locale"
import { Calendar } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { FilterFormData } from "@/app/types/filterFormData"
import { useState } from "react"
import Image from "next/image"

interface DateFilterProps {
  form: UseFormReturn<FilterFormData>
  startDate: Date | undefined
  endDate: Date | undefined
  onChange: (dates: [Date | null, Date | null]) => void
  onClear?: () => void
}

export function DateFilter({
  form,
  startDate,
  endDate,
  onChange,
  onClear,
}: DateFilterProps) {
  const [isActive, setIsActive] = useState(false)
  const { control } = form
// console.log(startDate,'startDateeee');
// console.log(endDate,'endDateeeee');
  return (
    <div className="space-y-6">
      {/* Encabezado de sección */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <Image src="/calendar.svg" alt="Download" width={32} height={32} />
          <span>Fecha</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={() => setIsActive(!isActive)}
          />
          <div className="w-11 h-6 bg-[#606882] rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute 
            after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#022A9A]"
          />
        </label>
      </div>

      {/* Contenido de la sección */}
      {isActive && (
        <div className="mt-4 bg-white w-[50%] p-4 mx-auto shadow-gray-100 rounded-sm">
          <p className="font-medium mb-2 text-center">Seleccionar rango de fechas</p>
          <div className="flex flex-col items-center justify-center rounded-lg p-4">
            <div className="flex gap-2">
              <Controller
                name="startDate"
                control={control}
                render={({ field: { onChange: fieldOnChange } }) => {
                  // console.log(startDate,': STARTDATE', endDate,': ENDATE')
                  return (
                    <DatePicker
                      locale={es}
                      selected={startDate}
                      onChange={(dates) => {
                        fieldOnChange(dates);
                        onChange(dates);
                      }}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                      calendarStartDay={0}
                      dateFormat="dd/MM/yyyy"
                      className="w-full"
                    />
                  );
                }}
              />

            </div>
            <div className="ml-[40%] justify-end mt-4">
              <Button 
                variant="outline" 
                onClick={onClear}
                className="text-[#022A9A] border border-[#022A9A] max-w-[200px] rounded-full w-fit"
              >
                Borrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
