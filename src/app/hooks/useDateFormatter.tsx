// src/app/hooks/useDateFormatter.ts
import { useCallback } from 'react';

const useDateFormatter = () => {
  const formatDate = useCallback((date: Date | null): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return ''; // Verifica si es un objeto Date válido
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  return { formatDate };
};

export default useDateFormatter;