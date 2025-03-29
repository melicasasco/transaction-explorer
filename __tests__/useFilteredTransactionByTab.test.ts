// // src/app/hooks/__tests__/useFilteredTransactionByTab.test.ts
// import { renderHook } from '@testing-library/react-hooks';
// import useFilteredTransactions from '@/app/hooks/useFilteredTransactionByTab';
// import { ApiData } from '@/app/types/transaction';
// import { act } from "react-dom/test-utils";

// import { render, screen, waitFor } from "@testing-library/react";
// // Componente de prueba para exponer el hook

// function TestComponent({ data: data, activeTab }: { data: ApiData, activeTab: string }) {
// //   const filtered Transactions = useFilteredTransactions(data, activeTab);
//   return (
//     <div data-testid="result">
//       {JSON.stringify(filteredTransactions)}
//     </div>
//   );
// }

// // Ejemplo de transacciones para usar en los tests
// const transactions = [
//   // Transacción que ocurre el 29 de marzo de 2025 a las 06:00:00Z
//   { id: "1", createdAt: "2025-03-29T06:00:00Z" },
//   // Transacción del 28 de marzo de 2025 a las 23:00:00Z
//   { id: "2", createdAt: "2025-03-28T23:00:00Z" },
//   // Transacción dentro de la misma semana (lunes 24 de marzo de 2025)
//   { id: "3", createdAt: "2025-03-25T12:00:00Z" },
//   // Transacción a inicios de mes (1 de marzo de 2025)
//   { id: "4", createdAt: "2025-03-01T12:00:00Z" },
// ];

// const apiData = { transactions };

// describe("useFilteredTransactions", () => {
//   // Fijamos la fecha actual en un punto concreto para tener resultados deterministas
//   const fixedDate = new Date("2025-03-29T12:00:00Z");

//   beforeAll(() => {
//     jest.useFakeTimers("modern");
//     jest.setSystemTime(fixedDate);
//   });

//   afterAll(() => {
//     jest.useRealTimers();
//   });

//   test("retorna [] si data es nulo o no tiene transactions", async () => {
//     render(<TestComponent data={null} activeTab="diario" />);
//     await waitFor(() => {
//       expect(screen.getByTestId("result").textContent).toBe("[]");
//     });
//   });

//   test("filtra correctamente para el tab 'diario'", async () => {
//     render(<TestComponent data={apiData} activeTab="diario" />);
//     await waitFor(() => {
//       // Solo se consideran transacciones del día (29 de marzo desde las 00:00 hasta fixedDate)
//       const result = JSON.parse(screen.getByTestId("result").textContent);
//       expect(result).toHaveLength(1);
//       expect(result[0].id).toBe("1");
//     });
//   });

//   test("filtra correctamente para el tab 'semanal'", async () => {
//     render(<TestComponent data={apiData} activeTab="semanal" />);
//     await waitFor(() => {
//       // La semana inicia el lunes 24 de marzo de 2025 hasta fixedDate (29 de marzo)
//       const result = JSON.parse(screen.getByTestId("result").textContent);
//       // Se esperan los tx con id "1", "2" y "3"
//       expect(result).toHaveLength(3);
//       const ids = result.map((tx) => tx.id);
//       expect(ids).toEqual(expect.arrayContaining(["1", "2", "3"]));
//     });
//   });

//   test("filtra correctamente para el tab 'mensual'", async () => {
//     render(<TestComponent data={apiData} activeTab="mensual" />);
//     await waitFor(() => {
//       // El mes inicia el 1 de marzo de 2025, por lo que se incluyen todas las transacciones
//       const result = JSON.parse(screen.getByTestId("result").textContent);
//       expect(result).toHaveLength(4);
//       const ids = result.map((tx) => tx.id);
//       expect(ids).toEqual(expect.arrayContaining(["1", "2", "3", "4"]));
//     });
//   });

//   test("devuelve todas las transacciones si activeTab no coincide con ninguno de los casos", async () => {
//     render(<TestComponent data={apiData} activeTab="otro" />);
//     await waitFor(() => {
//       // Si activeTab no es "diario", "semanal" o "mensual", se retornan todas las transacciones
//       const result = JSON.parse(screen.getByTestId("result").textContent);
//       expect(result).toHaveLength(4);
//     });
//   });
// });
