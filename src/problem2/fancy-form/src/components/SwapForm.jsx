import React, { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { getSwappableTokens } from "../services/tokenService";
import TokenSelector from "./TokenSelector";

const SwapForm = () => {
  const [tokens, setTokens] = useState([]);
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [loading, setLoading] = useState(true);

  // Add disabled state
  const isDisabled = !fromToken || !fromAmount || fromAmount === "0";

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    try {
      setLoading(true);
      const tokenList = await getSwappableTokens();
      setTokens(tokenList);

      // Set ETH as default from token
      if (tokenList.length > 0) {
        const ethToken = tokenList.find((t) => t.symbol === "ETH");
        setFromToken(ethToken || tokenList[0]);
      }
    } catch (error) {
      console.error("Error loading tokens:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("fromToken", fromToken);
  console.log("token List", tokens);
  console.log("fromAmount", fromAmount);
  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    // Remove amount swapping logic - keep amounts as they are
  };

  const handleAmountChange = (value) => {
    // Only allow numbers and decimal points
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
    }
  };

  const formatUSD = (amount, price) => {
    if (!amount || !price || isNaN(amount)) return "$0";
    const usdValue = parseFloat(amount) * price;

    const absValue = Math.abs(usdValue);

    if (absValue >= 1e12) {
      return `$${(usdValue / 1e12).toFixed(2)}T`;
    } else if (absValue >= 1e9) {
      return `$${(usdValue / 1e9).toFixed(2)}B`;
    } else if (absValue >= 1e6) {
      return `$${(usdValue / 1e6).toFixed(2)}M`;
    } else {
      // Format có dấu phẩy ngăn cách
      return `$${usdValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col gap-1 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-4">
      {/* Sell Section */}
      <div className="p-4 border border-gray-200 rounded-xl">
        <div className="text-sm font-medium text-left text-gray-600 mb-3">
          Sell
        </div>

        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            value={fromAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0"
            className="text-4xl font-light text-gray-900 bg-transparent border-none outline-none flex-1 placeholder-gray-400"
          />

          <div className="min-w-[200px]">
            <TokenSelector
              selectedToken={fromToken}
              onTokenSelect={setFromToken}
              tokens={tokens}
              excludeToken={toToken}
            />
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-500 text-left">
          {fromToken && fromAmount
            ? formatUSD(fromAmount, fromToken.price)
            : "$0"}
        </div>
      </div>

      {/* Swap Arrow */}
      <div className="flex justify-center bg-white relative">
        <button
          onClick={handleSwapTokens}
          className="absolute -top-3 bg-white border-4 border-gray-100 rounded-full p-2 hover:border-gray-200 transition-colors z-10"
        >
          <ArrowUpDown className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Buy Section */}
      <div
        className={`p-4 border border-gray-200 rounded-xl ${
          isDisabled ? "bg-gray-100" : "bg-white"
        }`}
      >
        <div className="text-sm font-medium text-left text-gray-600 mb-3">
          Buy
        </div>

        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            value={toAmount}
            readOnly
            disabled={isDisabled}
            placeholder="0"
            className={`text-4xl font-light bg-transparent border-none outline-none flex-1 placeholder-gray-400 ${
              isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-900"
            }`}
          />

          <div className="min-w-[200px]">
            <TokenSelector
              selectedToken={toToken}
              onTokenSelect={setToToken}
              tokens={tokens}
              excludeToken={fromToken}
              className={
                isDisabled ? "opacity-50 pointer-events-none" : ""
              }
            />
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-500 text-left">
          {toToken && toAmount && !isDisabled
            ? formatUSD(toAmount, toToken.price)
            : "$0"}
        </div>
      </div>
    </div>
  );
};

export default SwapForm;
