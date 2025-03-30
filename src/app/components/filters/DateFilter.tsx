"use client"

import { Controller, UseFormReturn } from "react-hook-form"
import DatePicker from "react-datepicker"
import { es } from "date-fns/locale"
import { Button } from "@/app/components/ui/button"
import { FilterFormData } from "@/app/types/filterFormData"
import Image from "next/image"
import { IsActiveState } from "@/app/types/toggleActivation"

interface DateFilterProps {
  form: UseFormReturn<FilterFormData>
  isActive: IsActiveState
  onSetIsActive: React.Dispatch<React.SetStateAction<IsActiveState>>;
}

export function DateFilter({
  form,
  isActive,
  onSetIsActive,
}: DateFilterProps) {

  const { control, getValues, setValue } = form; 

  const onChange = (dates: [Date | null, Date | null]) => {
    if (dates) {
      setValue('startDate', dates[0]); 
      setValue('endDate', dates[1]);
    }
  };
  // console.log(watch('startDate'), 'watch startDate');
  // console.log(watch('endDate'), 'watch endDate');

  const onClear = () => {
    setValue('startDate', null);
    setValue('endDate', null);
  }
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
            checked={isActive["calendar"]}
            className="sr-only peer"
            onChange={() => onSetIsActive(prevSate => ({
              ...prevSate,
              calendar: !prevSate.calendar,
            }))}
          />
          <div className="w-11 h-6 bg-[#606882] rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute 
            after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#022A9A]"
          />
        </label>
      </div>

      {/* Contenido de la sección */}
      {isActive["calendar"] && (
        <div className="mt-4 bg-white w-[50%] p-4 mx-auto shadow-gray-100 rounded-sm">
          <p className="font-medium mb-2 text-center">Seleccionar rango de fechas</p>
          <div className="flex flex-col items-center justify-center rounded-lg p-4">
            <div className="flex gap-2">
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
                      startDate={getValues('startDate')}
                      endDate={getValues('endDate')}
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
