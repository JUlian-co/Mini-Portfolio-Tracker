"use client";

import TotalAssetsCard from "@/components/TotalAssetsCard";
import TotalPortfolioValueCard from "@/components/TotalPortfolioValueCard.jsx";
import BalancePie from "@/components/TotalPortfolioValueCard.jsx";
import { useTokens } from "@/hooks/TokenProvider";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, loading, selectedNetwork, setSelectedNetwork, getTokens, setAddress, address } = useTokens();

  useEffect(() => {
    setAddress("0xd8da6bf26964af9d7eed9e03e53415d37aa96045");
    console.log("address in page:", address);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center selection:bg-emerald-300/60 selection:text-gray-100 max-w-3xl mx-auto">
      <h1 className="font-semibold text-2xl tracking-[0.01px] mb-4">
        Mini Portfolio Tracker
      </h1>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        placeholder="0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
        value={address}
        className="py-2 w-full min-w-[156px] max-w-3xs px-4 ring-1 ring-[#555] rounded-xl bg-[#555]/30 focus:outline-none focus:bg-[#555]/50 focus:ring-emerald-300"
      />
      <select
        id="network-select"
        value={selectedNetwork}
        onChange={(e) => setSelectedNetwork(e.target.value)}
        className="mt-4 w-full min-w-[156px] max-w-3xs px-4 py-2 bg-[#555]/45 border border-[#555]  rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all duration-200 cursor-pointer"
      >
        <option value="all">All Networks</option>
        <option value="ethereum">Ethereum</option>
        <option value="base">Base</option>
        <option value="arbitrum">Arbitrum</option>
        <option value="polygon">Polygon</option>
      </select>
      <>
        <TotalPortfolioValueCard />
        <TotalAssetsCard />
      </>
    </div>
  );
}
