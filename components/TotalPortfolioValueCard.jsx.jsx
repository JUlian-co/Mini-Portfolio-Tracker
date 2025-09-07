"use client"

import { useTokens } from "@/hooks/TokenProvider";
import { formatTokenData } from "@/utils/formatTokenData";
import React, { useState } from "react";
import { Pie, PieChart, Tooltip } from "recharts";

export default function TotalPortfolioValueCard() {
  const { data } = useTokens();
  const chartDataType = ["value", "amount"];
  const [chartDataTypeIndex, setChartDataTypeIndex] = useState(0);
  const chartDataTypeCurrent = chartDataType[chartDataTypeIndex];

  let totalTokenValue = 0;
  console.log("ttv", totalTokenValue)

  const valueChartData = data.map((token) => {
    const { symbol, totalValue } = formatTokenData(token);
    totalTokenValue += totalValue;
    return { name: symbol, value: totalValue };
  });


  const amountChartData = data.map((token) => {
    const { symbol, balance } = formatTokenData(token);
    return {name: symbol, value: balance}
  })

  return (
    <div className="m-8 p-6 border-1 rounded-xl bg-[#555]/45 flex flex-col items-center justify-center border-[#555] w-full">
      <h2 className="">Token Portfolio</h2>
      <p className="text-[#999]">Total USD Value: ${totalTokenValue.toFixed(2).toLocaleString()}</p>

      <div className="flex mt-4 ring-1 ring-[#555] rounded-xl transition-all duration-200 w-2xs justify-center max-sm:w-full">
        <button onClick={() => setChartDataTypeIndex(0)} className={`flex item-center justify-center py-4 text-center w-1/2 cursor-pointer rounded-l-xl active:ring-2 ring-emerald-300 ${chartDataTypeCurrent === "value" ? 'bg-[#555]/30' : ''}`}>Value</button>
        <button onClick={() => setChartDataTypeIndex(1)} className={`flex item-center justify-center py-4 text-center w-1/2 cursor-pointer rounded-r-xl active:ring-2 ring-emerald-300 ${chartDataTypeCurrent === "value" ? '' : 'bg-[#555]/30'}`}>Amount</button>
      </div>

      <PieChart width={260} height={260}>
        <Pie
          activeShape={{ fill: "#5ee9b5" }}
          data={chartDataTypeCurrent === "value" ? valueChartData : amountChartData}
          dataKey="value"
          nameKey="name"
        />
        <Tooltip
          formatter={(value, name) => [`${chartDataTypeCurrent === "value" ? '$' : ''}${value.toFixed(2)}`, name]}
        />
      </PieChart>
    </div>
  );
}
