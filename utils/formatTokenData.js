// utils/formatTokenData.js
import { formatUnits } from "ethers";

/**
 * Extrahiert Balance, Kurs und Gesamtwert eines Tokens
 * @param {Object} token - Token-Objekt aus Alchemy API
 * @returns {Object} { balance, price, totalValue, symbol }
 */
export function formatTokenData(token) {
  try {
    // Balance in BigInt umwandeln
    const rawBalance = BigInt(token.tokenBalance);

    // Dezimalstellen des Tokens
    const decimals = token.tokenMetadata?.decimals ?? 18;

    // Lesbarer Balance-Wert
    const balance = parseFloat(formatUnits(rawBalance, decimals));

    // Preis (falls vorhanden, sonst 0)
    const price = parseFloat(token.tokenPrices?.[0]?.value ?? 0);

    // Gesamtwert
    const totalValue = balance * price;

    const network = token.network ?? "unknown";

    if (token.tokenAddress === null) {
      // ETH-Spezialfall: Name und Symbol überschreiben
      return {
        balance,
        price,
        totalValue,
        symbol: "ETH",
        name: "Ethereum",
        network
      };
    }

    return {
      balance,
      price,
      totalValue,
      symbol: token.tokenMetadata?.symbol ?? "UNK",
      name: token.tokenMetadata?.name ?? "Unknown Token",
      network
    };
  } catch (err) {
    console.error("Fehler bei formatTokenData:", err);
    return { balance: 0, price: 0, totalValue: 0, symbol: "UNK" };
  }
}
