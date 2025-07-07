import { useState } from "react";

export default function HourlyProfitCalculator() {
  const [prepTime, setPrepTime] = useState();
  const [sessionTime, setSessionTime] = useState();
  const [cleanupTime, setCleanupTime] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [materialCost, setMaterialCost] = useState();
  const [fixedCost, setFixedCost] = useState();
  const [adCost, setAdCost] = useState();
  const [weeklyHours, setWeeklyHours] = useState();

  const totalTime = (prepTime || 0) + (sessionTime || 0) + (cleanupTime || 0);
  const totalCost = (materialCost || 0) + (fixedCost || 0) + (adCost || 0);
  const profit = (totalRevenue || 0) - totalCost;
  const hourlyProfit = totalTime > 0 ? profit / totalTime : 0;
  const estimatedWeeklyProfit = weeklyHours > 0 ? hourlyProfit * weeklyHours : 0;
  const estimatedMonthlyProfit = estimatedWeeklyProfit * 4;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow space-y-4">
      <h2 className="text-2xl font-semibold text-center\">⏰시간당 수익 기반 예상 수익 계산기</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <label>
          총 매출 (예상, 원)
          <input
            type="number"
            value={totalRevenue || ""}
            onChange={(e) => setTotalRevenue(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          준비 시간 (시간)
          <input
            type="number"
            step="0.1"
            value={prepTime || ""}
            onChange={(e) => setPrepTime(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          수업 시간 (시간)
          <input
            type="number"
            step="0.1"
            value={sessionTime || ""}
            onChange={(e) => setSessionTime(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          정리 시간 (시간)
          <input
            type="number"
            step="0.1"
            value={cleanupTime || ""}
            onChange={(e) => setCleanupTime(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          재료비 (원)
          <input
            type="number"
            value={materialCost || ""}
            onChange={(e) => setMaterialCost(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          고정비용 (원)
          <input
            type="number"
            value={fixedCost || ""}
            onChange={(e) => setFixedCost(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          마케팅/기타 비용 (원)
          <input
            type="number"
            value={adCost || ""}
            onChange={(e) => setAdCost(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
        <label>
          내가 일할 시간 (주 단위, 시간)
          <input
            type="number"
            step="1"
            value={weeklyHours || ""}
            onChange={(e) => setWeeklyHours(Number(e.target.value))}
            className="w-full mt-1 border px-2 py-1 rounded"
          />
        </label>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg space-y-2 text-sm">
        <p>🕒 총 1회당 투입 시간: <strong>{totalTime.toFixed(1)}시간</strong></p>
        <p>💸 총 비용 (1회당): <strong>{totalCost.toLocaleString()}원</strong></p>
        <p>✅ 순이익 (매출 - 비용): <strong>{profit.toLocaleString()}원</strong></p>
        <p>📊 시간당 수익: <strong className={hourlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}>{hourlyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}원</strong></p>
        <p>📅 주간 예상 수익: <strong className={estimatedWeeklyProfit >= 0 ? 'text-green-600' : 'text-red-600'}>{estimatedWeeklyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}원</strong></p>
        <p>📆 월간 예상 수익: <strong className={estimatedMonthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}>{estimatedMonthlyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}원</strong></p>
      </div>
    </div>
  );
}