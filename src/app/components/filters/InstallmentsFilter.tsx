"use client"

import { FilterFormData } from "@/app/types/filterFormData"
import { UseFormReturn } from "react-hook-form"
import Image from "next/image"
import { IsActiveState } from "@/app/types/toggleActivation";

interface InstallmentsFilterProps {
  form: UseFormReturn<FilterFormData>
  uniqueInstallments: string[]
  isActive: IsActiveState
  onSetIsActive: React.Dispatch<React.SetStateAction<IsActiveState>>;
  toggleValue: (field: "installments", value: string) => void
}

export function InstallmentsFilter({
  form,
  uniqueInstallments,
  isActive,
  onSetIsActive,
  toggleValue,
}: InstallmentsFilterProps) {
  const watchInstallments = form.watch("installments")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/installments.svg" alt="Download" width={32} height={32} />
          <span>Cuotas</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isActive["installments"]}
            className="sr-only peer"
            onChange={() => onSetIsActive(prevSate => ({
              ...prevSate,
              installments: !prevSate.installments,
            }))}
          
          />
          <div className="w-11 h-6 bg-[#606882] rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute 
            after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#022A9A]"
          />
        </label>
      </div>

      {isActive["installments"] && (
        <div className="flex flex-wrap gap-2 mt-4">
          {uniqueInstallments.map((inst) => {
            const isSelected = watchInstallments.includes(inst)
            return (
              <button
                key={inst}
                type="button"
                onClick={() => toggleValue("installments", inst)}
                className={`px-3 py-1 rounded-full border ${
                  isSelected
                    ? "bg-blue-50 border-[#022A9A] text--[#022A9A]"
                    : "border-gray-300"
                }`}
              >
                {inst}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
