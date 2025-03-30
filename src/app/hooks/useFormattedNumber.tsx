import { useMemo } from 'react';

export function useFormattedNumber(number: number, locale: string = 'en-US'): string {
  // Se llama a useMemo en todo render, sin condiciones previas
  const formatted = useMemo(() => {
    // Si number es nulo o indefinido, se retorna un valor predeterminado
    if (number == null) return '0.00';
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  }, [locale, number]);

  return formatted;
}
