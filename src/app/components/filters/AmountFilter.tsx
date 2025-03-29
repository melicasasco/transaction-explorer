"use client";

import React, { useState } from "react";
import { Range } from "react-range";
import { UseFormReturn } from "react-hook-form";
import { FilterFormData } from "@/app/types/filterFormData";
import Image from "next/image";

interface AmountFilterProps {
  form: UseFormReturn<FilterFormData>;
  highestAmountData: number;
  lowestAmountData: number;
}

export function AmountFilter({
  form,
  lowestAmountData,
  highestAmountData,
}: AmountFilterProps) {
  const [isActive, setIsActive] = useState(false);

  // Estado local para los valores de rango
  const [rangeValues, setRangeValues] = useState([
    lowestAmountData,
    highestAmountData,
  ]);

  const { setValue } = form;

  // ak Handler que actualiza el estado local y los campos en el formulario
  const handleRangeChange = (values: number[]) => {
    // console.log(values,'moooo');
    setRangeValues(values);
    setValue("amountMin", values[0]);
    setValue("amountMax", values[1]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <Image src="/amount.svg" alt="Download" width={32} height={32} />
          <span>Monto</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={() => setIsActive(!isActive)}
          />
          <div
            className="w-11 h-6 bg-[#606882] rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute 
            after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#022A9A]"
          />
        </label>
      </div>

      {isActive && (
        <div className="mt-4 mx-6">
          <label className="block text-sm text-gray-600 mb-4">
            Selecciona un rango de monto
          </label>

          <Range
            step={1}
            min={lowestAmountData}
            max={highestAmountData}
            values={rangeValues}
            onChange={handleRangeChange}
            renderTrack={({ props, children }) => {
              const { style, ...restProps } = props;
              return (
                <div
                  {...restProps}
                  className="h-2 bg-gray-200 rounded relative"
                  style={style}
                >
                  <div
                    className="h-2 bg-[#022A9A] rounded absolute"
                    style={{
                      left: `${
                        ((rangeValues[0] - lowestAmountData) /
                          (highestAmountData - lowestAmountData)) *
                        100
                      }%`,
                      width: `${
                        ((rangeValues[1] - rangeValues[0]) /
                          (highestAmountData - lowestAmountData)) *
                        100
                      }%`,
                    }}
                  />
                  {children}
                </div>
              );
            }}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props;
              return (
                <div
                  {...restProps}
                  key={key}
                  className="h-6 w-6 bg-[#022A9A] border border-[#022A9A] rounded-full"
                  style={{ ...restProps.style }}
                />
              );
            }}
          />
          <div className="flex justify-between mb-4 mt-5">
            <span className="border border-[#022A9A] p-2 rounded">
              <p className="text-[12px] text-[#606882]">Monto mínimo</p>
              <span className="text-[16px]"> {`$${rangeValues[0]}`}</span>
            </span>
            <span className="border border-[#022A9A] p-2 rounded">
              <p className="text-[12px] text-[#606882]">Monto máximo</p>
              <span className="text-[16px]"> {`$${rangeValues[1]}`}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
