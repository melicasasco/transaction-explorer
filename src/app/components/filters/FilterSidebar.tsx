"use client"

import { useForm } from "react-hook-form"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { Transaction } from "../../types/transaction"
import { DateFilter } from "./DateFilter"
import { CardFilter } from "./CardFilter"
import { InstallmentsFilter } from "./InstallmentsFilter"
import { AmountFilter } from "./AmountFilter"
import { MethodsFilter } from "./MethodsFilter"
import { useRouter } from "next/navigation"
import useDateFormatter from "@/app/hooks/useDateFormatter"
import { useRef } from "react"
import { FilterFormData } from "@/app/types/filterFormData"
import useOnClickOutside from "@/app/hooks/onMousseEvent"

interface FilterSidebarProps {
  onSetShowFilters: (showFilters: boolean) => void
  data: Transaction[]
  startDate: Date | undefined
  endDate: Date | undefined
  onChange: (dates: [Date | null, Date | null]) => void
  onClear?: () => void
}

export default function FilterSidebar({
  onSetShowFilters,
  data,
  startDate,
  endDate,
  onChange,
  onClear = () => {},
}: FilterSidebarProps) {
  const { formatDate } = useDateFormatter()
  const sidebarRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sidebarRef, () => onSetShowFilters(false));

  const filterValues = useForm<FilterFormData>({
    defaultValues: {
      startDate: null,
      endDate: null,
      cards: [],
      installments: [],
      amountMin: 0,
      amountMax: 0,
      methods: [],
    },
  })

  const { watch, setValue, handleSubmit, reset } = filterValues


  const router = useRouter();
  // fc p alternar valores en arrays (cards, installments, methods)
  const toggleValue = (
    field: "cards" | "installments" | "methods",
    value: string
  ) => {
    const current = watch(field) as string[]
    if (current.includes(value)) {
      setValue(field, current.filter((v) => v !== value))
    } else {
      setValue(field, [...current, value])
    }
  }

  // options unicas extraidas de la data
  const uniqueCards = [...new Set(data.map((tx) => tx.card))]
  const uniqueInstallments = [...new Set(data.map((tx) => String(tx.installments))),]

  const uniquePaymentMethods = [
    ...new Set(data.map(tx => tx.paymentMethod).filter((m): m is string => Boolean(m)))
  ];

  const onSubmit = (formData: FilterFormData) => {
    // Actualiza la URL con los filtros seleccionados
    const queryParams = new URLSearchParams();
    
    // Obtener startDate y endDate del array
    const dateRange = formData.startDate; // Asumiendo que formData.startDate es el array
    // console.log(dateRange,'daterange');
    const startDateValue = Array.isArray(dateRange) && dateRange[0] ? new Date(dateRange[0].setHours(0, 0, 0, 0)) : null; // Establecer la primera hora del día
    const endDateValue = Array.isArray(dateRange) && dateRange[1] ? new Date(dateRange[1].setHours(23, 59, 59, 999)) : null; // Establecer la última hora del día

    // Formatear las fechas antes de agregarlas a la URL tipo AAAA-MM-DD
    const formattedStartDate = formatDate(startDateValue);
    const formattedEndDate = formatDate(endDateValue);

    // Calcular el total de las cantidades filtradas
    const totalAmount = data
      .filter(tx => 
        (formData.cards.length === 0 || formData.cards.includes(tx.card)) &&
        (formData.installments.length === 0 || formData.installments.includes(String(tx.installments))) &&
        (formData.methods.length === 0 || formData.methods.includes(tx.paymentMethod as string))
      )
      .reduce((sum, tx) => sum + tx.amount, 0);

    // Redondear a 2 decimales antes de agregarlo a la URL
    queryParams.append("totalAmount", totalAmount.toFixed(2));

    if (formattedStartDate) {
      queryParams.append("startDate", formattedStartDate);
    }
    if (formattedEndDate) {
      queryParams.append("endDate", formattedEndDate);
    }
    if (formData.cards.length > 0) {
      formData.cards.forEach(card => queryParams.append("cards", card)); 
    }
    if (formData.installments.length > 0) {
      formData.installments.forEach(installment => queryParams.append("installments", installment));
    }
    if (formData.amountMin || formData.amountMax) {
      queryParams.append("amountMin", formData.amountMin.toString());
      queryParams.append("amountMax", formData.amountMax.toString());
    }
    if (formData.methods.length > 0) {
      formData.methods.forEach(method => queryParams.append("methods", method)); 
    }
  
    router.push(`/dashboard?${queryParams.toString()}`); 
  };
  

  const clearUrlFilters = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("startDate");
    queryParams.delete("endDate");
    queryParams.delete("cards");
    queryParams.delete("installments");
    queryParams.delete("amountMin");
    queryParams.delete("amountMax");
    queryParams.delete("methods");
    queryParams.delete("totalAmount");
    
    router.push(`/dashboard?${queryParams.toString()}`); 
  }

  const clearFilters = () => {
    reset()
    clearUrlFilters()
    setValue("cards", []);
    setValue("installments", []);
    setValue("methods", []);
    setValue("amountMax", 0);
    setValue("amountMin", 0)
    onClear()
  }

  const highestAmountData = Math.round(data.reduce((max, tx) => Math.max(max, tx.amount), 0))
  const lowestAmountData = Math.round(data.reduce((min, tx) => Math.min(min, tx.amount), 0))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div ref={sidebarRef} className="p-4 h-screen text-black w-full md:w-[520px] flex flex-col relative ">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button type="button" onClick={() => onSetShowFilters(false)}>
              <Image
                src="/left.svg"
                width={24}
                height={24}
                alt="Volver"
                className="cursor-pointer"
              />
            </button>
            <h2 className="text-lg font-medium">Filtros</h2>
          </div>
          <Button variant={"ghost"}
            type="button"
            className="text-[#002066] text-sm cursor-pointer"
            onClick={clearFilters}
          >
            Limpiar
          </Button>
         
        </div>

        <div className="pb-6 font-semibold text-gray-700">Todos los filtros</div>

        {/* aqui los filter components*/}
        <div className="space-y-6 overflow-y-auto pb-32">
          <DateFilter
            form={filterValues}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            onClear={onClear}
          />
          <CardFilter
            form={filterValues}
            uniqueCards={uniqueCards}
            toggleValue={toggleValue}
          />
          <InstallmentsFilter
            form={filterValues}
            uniqueInstallments={uniqueInstallments}
            toggleValue={toggleValue}
          />
          <AmountFilter 
            form={filterValues}
            highestAmountData={highestAmountData}
            lowestAmountData={lowestAmountData}
          />
          <MethodsFilter
            form={filterValues}
            uniquePaymentMethods={uniquePaymentMethods}
            toggleValue={toggleValue}
          />
        </div>

        {/* button */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white">
          <Button type="submit" className="w-full py-3 bg-[#022A9A] rounded-full cursor-pointer">
            Aplicar filtros
          </Button>
        </div>
      </div>
    </form>
  )
}
