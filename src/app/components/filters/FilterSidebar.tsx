"use client"

import { useForm } from "react-hook-form"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { DateFilter } from "./DateFilter"
import { CardFilter } from "./CardFilter"
import { InstallmentsFilter } from "./InstallmentsFilter"
import { AmountFilter } from "./AmountFilter"
import { MethodsFilter } from "./MethodsFilter"
import { useRouter, useSearchParams } from "next/navigation"
import useDateFormatter from "@/app/hooks/useDateFormatter"
import { useEffect, useRef, useState } from "react"
import { FilterFormData } from "@/app/types/filterFormData"
import useOnClickOutside from "@/app/hooks/onMousseEvent"
import { useDataContext } from "@/app/context/DataFilterContext"
import { Loader } from "lucide-react"
import { IsActiveState } from "@/app/types/toggleActivation";


interface FilterSidebarProps {
  onSetShowFilters: (showFilters: boolean) => void
  // startDate: Date | undefined
  // endDate: Date | undefined
  // onChange: (dates: [Date | null, Date | null]) => void
  // onClear?: () => void
}

export default function FilterSidebar({
  onSetShowFilters,
  // startDate,
  // endDate,
  // onChange,
  // onClear = () => {},
}: FilterSidebarProps) {
  const { formatDate } = useDateFormatter()
  const sidebarRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sidebarRef, () => onSetShowFilters(false));

  const [isActive, setIsActive] = useState<IsActiveState>({ cards: false, installments: false, methods: false, amount: false, calendar: false });
  const [resetTrigger, setResetTrigger] = useState(0);

  const { data, filters } = useDataContext();
  const searchParams = useSearchParams();

  const filterValues = useForm<FilterFormData>({
    defaultValues: {
      startDate: filters.startDate || null,
      endDate: filters.endDate || null,
      cards: filters.cards || null,
      installments: filters.installments || [],
      amountMin: filters.amountMin || 0,
      amountMax: filters.amountMax || 2000,
      methods: filters.methods || [],
    },
  })

  const { watch, setValue, handleSubmit, reset } = filterValues
  const router = useRouter();

  useEffect(() => {
    setIsActive({
      cards: filters.cards.length > 0,
      installments: filters.installments.length > 0,
      methods: filters.methods.length > 0,
      amount: filters.amountMin > 0 || (filters.amountMax < 2000 && filters.amountMax !== 0),
      calendar: !!(filters.startDate || filters.endDate),
    });
  }, [filters]);

// Función para alternar valores 
const toggleValue = (
  field: "cards" | "installments" | "methods" ,
  value: string
) => {
  const current = watch(field) as string[];
  console.log(current,'current');
  if (current.includes(value)) {
    setValue(field, current.filter((v) => v !== value));
  } else {
    setValue(field, [...current, value]);
  }
};

  
  if (!data) {
    return <div><Loader /></div>;
  }
  
  // uso las transacciones del objeto data
  const transactions = data.transactions;

  // Extraer opciones únicas a partir de las transacciones --> esto en realidad se puede tomar de la api, en metadata.
  const uniqueCards = [...new Set(transactions.map((tx) => tx.card))]
  const uniqueInstallments = [...new Set(transactions.map((tx) => String(tx.installments)))]
  const uniquePaymentMethods = [
    ...new Set(transactions.map(tx => tx.paymentMethod).filter((m): m is string => Boolean(m)))
  ];

  // const highestAmountData = Math.round(transactions.reduce((max, tx) => Math.max(max, tx.amount), 0))
  const highestAmountData = 2000
  const lowestAmountData = 0
  // const lowestAmountData = Math.round(transactions.reduce((min, tx) => Math.min(min, tx.amount), 0))

  const onSubmit = (formData: FilterFormData) => {
    
    const currentTab = searchParams.get("tab");
    const queryParams = new URLSearchParams();
    if (currentTab) {
      queryParams.append("tab", currentTab);
    } else {
      queryParams.append("tab", "semanal");
    }
    // Obtener startDate y endDate del array
    const formattedStartDate = formatDate(formData.startDate);
    const formattedEndDate = formatDate(formData.endDate);

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
    setValue("startDate", null);
    setValue("endDate", null);
    setValue("methods", []);
    setValue("amountMax", highestAmountData);
    setValue("amountMin", lowestAmountData)
    setResetTrigger(prev => prev + 1);
    setIsActive({ cards: false, installments: false, methods: false, amount: false, calendar: false });
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div ref={sidebarRef} className=" p-4 min-h-screen text-black w-[340px]  md:w-[520px] flex flex-col relative overflow-y-auto h-screen">
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

        {/* Componentes de filtros ---> */}
        <div className="space-y-6 overflow-y-auto pb-32">
          <DateFilter
            form={filterValues}
            onSetIsActive={setIsActive}
            isActive={isActive}
          />
          <CardFilter
            form={filterValues}
            uniqueCards={uniqueCards}
            toggleValue={toggleValue}
            onSetIsActive={setIsActive}
            isActive={isActive}
          />
          <InstallmentsFilter
            form={filterValues}
            uniqueInstallments={uniqueInstallments}
            toggleValue={toggleValue}
            onSetIsActive={setIsActive}
            isActive={isActive}
          />
          <AmountFilter 
            form={filterValues}
            highestAmountData={highestAmountData}
            lowestAmountData={lowestAmountData}
            resetTrigger={resetTrigger}
            onSetIsActive={setIsActive}
            isActive={isActive}
          />
          <MethodsFilter
            form={filterValues}
            uniquePaymentMethods={uniquePaymentMethods}
            toggleValue={toggleValue}
            onSetIsActive={setIsActive}
            isActive={isActive}

          />
        </div>

        {/* submit */}
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white">
          <Button type="submit" className="w-full py-3 bg-[#022A9A] rounded-full cursor-pointer">
            Aplicar filtros
          </Button>
        </div>
      </div>
    </form>
  )
}
