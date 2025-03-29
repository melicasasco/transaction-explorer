"use client"

import { Layers } from "lucide-react"
import { FilterFormData } from "@/app/types/filterFormData"
import { UseFormReturn } from "react-hook-form"
import { useState } from "react"
import Image from "next/image"

interface InstallmentsFilterProps {
  form: UseFormReturn<FilterFormData>
  uniqueInstallments: string[]
  toggleValue: (field: "installments", value: string) => void
}

export function InstallmentsFilter({
  form,
  uniqueInstallments,
  toggleValue,
}: InstallmentsFilterProps) {
  const [isActive, setIsActive] = useState(false)
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

      {isActive && (
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
                    ? "bg-blue-50 border- text--[#022A9A]"
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
