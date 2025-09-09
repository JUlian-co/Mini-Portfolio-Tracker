"use client"

import { createContext, useContext, useState, useEffect } from "react";

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("all");
  const [address, setAddress] = useState("");

  console.log("address in provider:", address);

  // Mapping for API
  const networkMapping = {
    ethereum: ["eth-mainnet"],
    base: ["base-mainnet"],
    arbitrum: ["arb-mainnet"],
    polygon: ["polygon-mainnet"],
    all: ["eth-mainnet", "base-mainnet", "arb-mainnet", "polygon-mainnet"],
  };

  const getApiNetworkValue = () => {
    return networkMapping[selectedNetwork];
  };

  // API Call
  const getTokens = async () => {
    setLoading(true);

    const apiNetworks = getApiNetworkValue();
    const url =
      `https://api.g.alchemy.com/data/v1/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/assets/tokens/by-address`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addresses: [
          {
            address: address,
            networks: apiNetworks,
          },
        ],
      }),
    };

    const response = await fetch(url, options);
    const json = await response.json();

    setData(json.data.tokens);
    setLoading(false);
  };

  useEffect(() => {
    getTokens();
  }, [selectedNetwork, address]);

  return (
    <TokenContext.Provider
      value={{ data, loading, selectedNetwork, setSelectedNetwork, getTokens, address, setAddress }}
    >
      {children}
    </TokenContext.Provider>
  );
}

// Custom Hook
export function useTokens() {
  return useContext(TokenContext);
}
