"use client";

import { useTokens } from "@/hooks/TokenProvider";
import { formatTokenData } from "@/utils/formatTokenData";
import { NetworkArbitrumOne, NetworkBase, NetworkEthereum, NetworkPolygon } from "@web3icons/react";
import React from "react";

export default function TotalAssetsCard() {
  const { data, loading, getTokens } = useTokens();
  
  function formatPrice(price) {
    if (price === 0) return "0.00";
    if (price >= 1) return price.toFixed(2);
    if (price >= 0.01) return price.toFixed(4);
    if (price >= 0.0001) return price.toFixed(6);
    if (price < 0.00001) return price;
  }

  function getNetworkLogo(network) {
    if (network === "eth-mainnet") {
        return <NetworkEthereum variant="branded" size="24" />
    }
    if (network === "base-mainnet") {
        return <NetworkBase variant="branded" size="24" />
    }
    if (network === "arb-mainnet") {
        return <NetworkArbitrumOne variant="branded" size="24" />
    }
    if (network === "matic-mainnet") {
        return <NetworkPolygon variant="branded" size="24" className=""/>
    }
    return null;
  }

  return (
    <div className="m-8 p-6 border-1 rounded-xl bg-[#555]/45 flex flex-col items-center justify-center border-[#555] w-full">
      <h2 className="mb-6">Assets</h2>
      <div className="flex justify-between items-center mb-4 w-full">

        <button onClick={getTokens} className="p-2 text-xl py-1 bg-[#555]/45 border border-[#555] rounded-xl hover:ring-2 ring-emerald-300 focus:ring-2 focus:outline-none transition-all duration-200 cursor-pointer">
            🔄
        </button>
      </div>
      {loading ? (<p className="animate-bounce">Loading...</p>) : (
        <div className="w-full border-y-1 border-[#555]">
        {data ? (
          <>
            {data.map((token, i) => {
              const { balance, price, totalValue, symbol, name, network } =
                formatTokenData(token);

              return (
                <div
                  key={i}
                  className="flex justify-between py-4 border-y-1 border-[#555] p-4 overflow-x-auto"
                >
                  {/* Links: Name + Symbol */}
                  <div className="text-left">
                    <div className="text-base flex items-center gap-1">{symbol} {getNetworkLogo(network)}</div>
                    <p className="text-base text-[#999]">
                      {name}
                    </p>
                  </div>

                  {/* Rechts: Gesamtwert, Kurs, Balance */}
                  <div className="text-right">
                    {/* Gesamtwert */}
                    <p className="font-semibold text-base">
                      ${totalValue.toFixed(2)}
                    </p>

                    {/* Kurs pro Token */}
                    {/* <p className="text-sm text-[#999]">
                      1 {symbol} = ${formatPrice(price)}
                    </p> */}

                    {/* Balance */}
                    <p className="text-base text-[#999]">
                      {balance} {symbol}
                    </p>

                    <p className="text-sm text-[#999]">
                        @ ${formatPrice(price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p>No tokens found</p>
        )}
      </div>
      )}

      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
    </div>
  );
}