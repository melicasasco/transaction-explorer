"use client"

import { Mail } from "lucide-react"
import { FilterFormData } from "@/app/types/filterFormData"
import { UseFormReturn } from "react-hook-form"
import { useState } from "react"
import Image from "next/image"

interface MethodsFilterProps {
  form: UseFormReturn<FilterFormData>
  uniquePaymentMethods: string[]
  toggleValue: (field: "methods", value: string) => void
}

export function MethodsFilter({
  form,
  uniquePaymentMethods,
  toggleValue,
}: MethodsFilterProps) {
  const [isActive, setIsActive] = useState(false)
  const watchMethods = form.watch("methods")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <Image src="/paymentmethod.svg" alt="Download" width={32} height={32} />
          <span>Métodos de cobro</span>
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
          {uniquePaymentMethods.map((method) => {
            const isSelected = watchMethods.includes(method)
            return (
              <button
                key={method}
                type="button"
                onClick={() => toggleValue("methods", method)}
                className={`px-3 py-1 rounded-full border ${
                  isSelected
                    ? "bg-blue-50 border-[#022A9A] text-[#022A9A]"
                    : "border-gray-300"
                }`}
              >
                {method}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
