import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";

export function useFormattedDate(
  isoDateString: string,
  dateFormat: string = "dd/MM/yyyy"
) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (isoDateString) {
      try {
        const parsedDate = parseISO(isoDateString);
        const newFormattedDate = format(parsedDate, dateFormat);
        setFormattedDate(newFormattedDate);
      } catch (error) {
        console.error("Error al formatear la fecha:", error);
        setFormattedDate("");
      }
    }
  }, [isoDateString, dateFormat]);

  return formattedDate;
}
