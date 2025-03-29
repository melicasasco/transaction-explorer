"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { ApiData } from "../../types/transaction";

interface MetricsClientProps {
  data: ApiData;
}

export default function MetricsClient({ data }: MetricsClientProps) {
  const [selectedMonth, setSelectedMonth] = useState<number | "">("");
// console.log(data,'data')

// if ( !data || !data.transactions) {
//     return <div>Cargando...</div>;
//   }

  const filteredTransactions = useMemo(() => {
    let txs = data.transactions;

    if (selectedMonth !== "") {
      txs = txs.filter((tx) => {
        const txDate = new Date(tx.createdAt);
        return txDate.getMonth() === Number(selectedMonth);
      });
    }
    return txs;
  }, [data.transactions, selectedMonth]);

  // Agrupar las transacciones filtradas por tarjeta y sumar los montos
  const chartData = useMemo(() => {
    const groups: { [key: string]: number } = {};
    filteredTransactions.forEach((tx) => {
      groups[tx.card] = (groups[tx.card] || 0) + tx.amount;
    });
    return Object.entries(groups).map(([card, amount]) => ({
      card,
      amount,
    }));
  }, [filteredTransactions]);

  return (
    <div className="p-6 flex-1 mx-auto">
      <div className="flex justify-between items-center mb-8 mt-18">
        <div className="flex-1">
          <h1 className="text-sm font-medium text-gray-500">
            Total de transacciones agrupadas por tarjeta
          </h1>
          <select
            value={selectedMonth}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedMonth(val === "" ? "" : Number(val));
            }}
            className="border p-2 rounded mt-2"
          >
            <option value="">Todos los meses</option>
            <option value="0">Enero</option>
            <option value="1">Febrero</option>
            <option value="2">Marzo</option>
            <option value="3">Abril</option>
            <option value="4">Mayo</option>
            <option value="5">Junio</option>
            <option value="6">Julio</option>
            <option value="7">Agosto</option>
            <option value="8">Septiembre</option>
            <option value="9">Octubre</option>
            <option value="10">Noviembre</option>
            <option value="11">Diciembre</option>
          </select>
        </div>
      </div>
      <h1 className="pb-8">Método de pago</h1>
      <div className="w-[50%] h-64 text-sm flex justify-center">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#022A9A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3564FD" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="card" />
            <YAxis
              width={100}
              tickFormatter={(value) =>
                `$${Number(value).toLocaleString()}`
              }
            />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Bar
              radius={[20, 20, 0, 0]}
              activeBar={true}
              type="monotone"
              dataKey="amount"
              stroke="#022A9A"
              maxBarSize={80}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
