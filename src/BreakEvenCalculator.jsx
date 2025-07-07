import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BreakEvenCalculator() {
  const [price, setPrice] = useState(35000);
  const [materialCost, setMaterialCost] = useState(8000);
  const [fixedCost, setFixedCost] = useState(125000);
  const [adCost, setAdCost] = useState(50000);
  const [headcount, setHeadcount] = useState(10);
  const [vatRate, setVatRate] = useState(10); // VAT rate (%)

  const revenuePerPerson = price - materialCost;
  const subtotalRevenue = price * headcount;
  const vatAmount = (subtotalRevenue * vatRate) / 100;
  const totalRevenue = subtotalRevenue + vatAmount;

  const totalVariableCost = materialCost * headcount;
  const totalCost = fixedCost + adCost + totalVariableCost;
  const profit = totalRevenue - totalCost;
  const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
  const breakEven = revenuePerPerson > 0 ? Math.ceil((fixedCost + adCost) / revenuePerPerson) : "-";

  const chartData = [
    { name: "Fixed Cost", value: fixedCost },
    { name: "Ad Cost", value: adCost },
    { name: "Variable Cost", value: totalVariableCost },
    { name: "Profit", value: Math.max(profit, 0) },
  ];

  const COLORS = ["#8884d8", "#ff8a65", "#82ca9d", "#ffc658"];

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-center">💡 Break-Even Calculator 손익분기 계산기</h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <label>
          🎨 Price per Person (1인당 수강료)
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          🖌️ Material Cost per Person (1인당 재료비)
          <input
            type="number"
            value={materialCost}
            onChange={(e) => setMaterialCost(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          🏠 Fixed Cost (고정 비용)
          <input
            type="number"
            value={fixedCost}
            onChange={(e) => setFixedCost(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          📢 Ad Cost (광고 및 마케팅 비용)
          <input
            type="number"
            value={adCost}
            onChange={(e) => setAdCost(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          👥 Number of Participants (워크샵 정원)
          <input
            type="number"
            value={headcount}
            onChange={(e) => setHeadcount(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          📊 VAT Rate (%) (부가세)
          <input
            type="number"
            value={vatRate}
            onChange={(e) => setVatRate(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 space-y-2 text-sm">
        <p>💰 Total Revenue (incl. VAT)(총매출): <strong>{totalRevenue.toLocaleString()} KRW</strong></p>
        <p>💸 Total Cost (총비용): <strong>{totalCost.toLocaleString()} KRW</strong></p>
        <p>📈 Profit (순이익): <strong className={profit >= 0 ? "text-green-600" : "text-red-600"}>
          {profit.toLocaleString()} KRW
        </strong></p>
        <p>📊 Profit Margin (마진률): <strong>{profitMargin.toFixed(1)}%</strong></p>
        <p>📍 Break-even Point (손익분기 정원): <strong>{breakEven} participants</strong></p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mt-4">
        <h3 className="text-center font-medium mb-2">📊 Profit Structure (손익분기 그래프)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toLocaleString()} KRW`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
