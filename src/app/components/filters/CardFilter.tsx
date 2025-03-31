"use client"

import { UseFormReturn } from "react-hook-form"
import { FilterFormData } from "@/app/types/filterFormData"
import Image from "next/image"
import { IsActiveState } from "@/app/types/toggleActivation";

interface CardFilterProps {
  form: UseFormReturn<FilterFormData>
  uniqueCards: string[]
  isActive: IsActiveState
  onSetIsActive: React.Dispatch<React.SetStateAction<IsActiveState>>;
  toggleValue: (field: "cards", value: string) => void
}

export function CardFilter({ form, uniqueCards, toggleValue, onSetIsActive, isActive }: CardFilterProps) {
  const watchCards = form.watch("cards")

 return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <Image src="/card-alt.svg" alt="Download" width={32} height={32} />
          <span>Tarjeta</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isActive["cards"]} 
            className="sr-only peer"
            onChange={() => onSetIsActive(prevSate => ({
              ...prevSate,
              cards: !prevSate.cards,
            }))}
          />
          <div className="w-11 h-6 bg-[#606882] rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute 
            after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#022A9A]"
          />
        </label>
      </div>

      {isActive["cards"] && (
        <div className="flex flex-wrap gap-2 mt-4">
          {uniqueCards.map((card) => {
            const isSelected = watchCards.includes(card)
            return (
              <button
                key={card}
                type="button"
                onClick={() => toggleValue("cards", card)}
                className={`px-3 py-1 rounded-full border ${
                  isSelected
                    ? "bg-blue-50 border-[#022A9A] text-[#022A9A]"
                    : "border-gray-300"
                }`}
              >
                {card}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
