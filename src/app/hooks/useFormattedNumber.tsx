import { useMemo } from "react";

export function useFormattedNumber(
  amount: number,
  locale: string = "de-DE",
  options?: Intl.NumberFormatOptions
): string {
  
  return useMemo(() => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    }).format(amount);
  }, [amount, locale, options]);
}
