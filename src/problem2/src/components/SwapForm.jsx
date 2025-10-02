import { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { getSwappableTokens } from "../services/tokenService";
import TokenSelector from "./TokenSelector";
import { message } from "antd";
const SwapForm = () => {
  // Ant Design message instance
  const [messageApi, contextHolder] = message.useMessage();

  // State variables
  const [tokens, setTokens] = useState([]);
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSwapping, setIsSwapping] = useState(false);

  // Validation state
  const [errors, setErrors] = useState({
    fromToken: "",
    toToken: "",
    fromAmount: "",
    general: "",
  });
  const [touched, setTouched] = useState({
    fromToken: false,
    toToken: false,
    fromAmount: false,
  });

  // Validation functions
  const validateAmount = (amount) => {
    if (!amount || amount === "0" || amount === "") {
      return "Please enter an amount";
    }
    if (isNaN(parseFloat(amount))) {
      return "Please enter a valid number";
    }

    return "";
  };

  const validateTokens = () => {
    const errors = {};
    if (!fromToken) {
      errors.fromToken = "Please select a token to sell";
    }
    if (!toToken) {
      errors.toToken = "Please select a token to buy";
    }
    if (fromToken && toToken && fromToken.symbol === toToken.symbol) {
      errors.general = "Cannot swap the same token";
    }
    return errors;
  };

  const validateForm = () => {
    const newErrors = {
      fromAmount: validateAmount(fromAmount),
      ...validateTokens(),
      general: "",
    };

    // Check if tokens are the same
    if (fromToken && toToken && fromToken.symbol === toToken.symbol) {
      newErrors.general = "Cannot swap the same token";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  // Add effect to calculate toAmount when fromAmount or tokens change
  useEffect(() => {
    if (fromToken && toToken && fromAmount && fromAmount !== "0") {
      // Simple conversion based on token prices
      const fromValue = parseFloat(fromAmount) * fromToken.price;
      const toTokenAmount = fromValue / toToken.price;
      setToAmount(toTokenAmount.toFixed(6));
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken]);

  // Real-time validation effect
  useEffect(() => {
    if (touched.fromAmount && fromAmount) {
      const amountError = validateAmount(fromAmount);
      setErrors((prev) => ({ ...prev, fromAmount: amountError }));
    }
  }, [fromAmount, touched.fromAmount]);

  // Validate tokens when they change
  useEffect(() => {
    if (fromToken && toToken && fromToken.symbol === toToken.symbol) {
      setErrors((prev) => ({
        ...prev,
        general: "Cannot swap the same token",
      }));
    } else {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  }, [fromToken, toToken]);

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

  const handleFromTokenSelect = (token) => {
    setFromToken(token);
    setTouched((prev) => ({ ...prev, fromToken: true }));
    setErrors((prev) => ({
      ...prev,
      fromToken: "",
      general:
        token && toToken && token.symbol === toToken.symbol
          ? "Cannot swap the same token"
          : "",
    }));
  };

  const handleToTokenSelect = (token) => {
    setToToken(token);
    setTouched((prev) => ({ ...prev, toToken: true }));
    setErrors((prev) => ({
      ...prev,
      toToken: "",
      general:
        fromToken && token && fromToken.symbol === token.symbol
          ? "Cannot swap the same token"
          : "",
    }));
  };

  const handleSwapTokens = () => {
    // Only swap if both tokens are selected
    if (!fromToken || !toToken) {
      messageApi.info("Please select both tokens to swap");
      return;
    }

    const tempToken = fromToken;

    setFromToken(toToken);
    setToToken(tempToken);

    // Clear any same token error
    setErrors((prev) => ({ ...prev, general: "" }));

    // Swap amounts and recalculate
    if (toAmount) {
      setFromAmount(toAmount);
      // toAmount will be recalculated by useEffect
    } else {
      setFromAmount("");
    }
  };

  const handleAmountChange = (value) => {
    // Only allow numbers and decimal points
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);

      // Mark as touched and validate
      setTouched((prev) => ({ ...prev, fromAmount: true }));

      // Clear amount error if value is valid
      if (
        value &&
        !isNaN(parseFloat(value)) &&
        parseFloat(value) > 0
      ) {
        setErrors((prev) => ({ ...prev, fromAmount: "" }));
      }
    }
  };

  const handleAmountBlur = () => {
    setTouched((prev) => ({ ...prev, fromAmount: true }));
    if (fromAmount) {
      const amountError = validateAmount(fromAmount);
      setErrors((prev) => ({ ...prev, fromAmount: amountError }));
    }
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    setTouched({
      fromToken: true,
      toToken: true,
      fromAmount: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSwapping(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form on success
      setFromAmount("");
      setToAmount("");
      setTouched({
        fromToken: false,
        toToken: false,
        fromAmount: false,
      });
      setErrors({
        fromToken: "",
        toToken: "",
        fromAmount: "",
        general: "",
      });

      messageApi.success(
        `Successfully swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}!`
      );
    } catch {
      setErrors((prev) => ({
        ...prev,
        general: "Swap failed. Please try again.",
      }));
    } finally {
      setIsSwapping(false);
    }
  };

  const isFormValid =
    fromToken &&
    toToken &&
    fromAmount &&
    !errors.fromToken &&
    !errors.toToken &&
    !errors.fromAmount &&
    !errors.general &&
    fromToken.symbol !== toToken.symbol &&
    parseFloat(fromAmount) > 0;

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
    <>
      {contextHolder}
      <div className="bg-white flex flex-col gap-1 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-3 sm:p-4 w-full max-w-lg mx-auto">
        {/* General Error Message */}
        {errors.general && (
          <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-medium">
              {errors.general}
            </p>
          </div>
        )}

        {/* Sell Section */}
        <div
          className={`p-3 sm:p-4 border rounded-xl ${
            !fromToken ? "bg-gray-100 cursor-pointer" : "bg-white"
          } ${
            errors.fromToken && touched.fromToken
              ? "border-red-300"
              : "border-gray-200"
          }`}
        >
          <div className="text-sm font-medium text-left text-gray-600 mb-3">
            Sell
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              onBlur={handleAmountBlur}
              placeholder="0"
              className={`text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 bg-transparent border-none outline-none flex-1 placeholder-gray-400 w-full ${
                errors.fromAmount && touched.fromAmount
                  ? "text-red-600"
                  : ""
              }`}
              onClick={(e) => !fromToken && e.stopPropagation()}
            />

            <div
              className="w-full sm:min-w-[100px] sm:max-w-[160px]"
              onClick={(e) => e.stopPropagation()}
            >
              <TokenSelector
                selectedToken={fromToken}
                onTokenSelect={handleFromTokenSelect}
                tokens={tokens}
                excludeToken={toToken}
              />
            </div>
          </div>

          <div className="mt-2 text-sm text-left">
            {errors.fromAmount && touched.fromAmount ? (
              <span className="text-red-500 font-medium">
                {errors.fromAmount}
              </span>
            ) : (
              <span className="text-gray-500">
                {fromToken && fromAmount
                  ? formatUSD(fromAmount, fromToken.price)
                  : "$0"}
              </span>
            )}
          </div>

          {errors.fromToken && touched.fromToken && (
            <div className="mt-2 text-sm text-red-500 font-medium">
              {errors.fromToken}
            </div>
          )}
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center bg-white relative">
          <button
            onClick={handleSwapTokens}
            className="absolute -top-3 bg-white border-4 border-gray-100 rounded-full p-2 hover:border-gray-200 transition-colors z-10 cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Buy Section */}
        <div
          className={`p-3 sm:p-4 border rounded-xl ${
            !toToken ? "bg-gray-100 cursor-pointer" : "bg-white"
          } ${
            errors.toToken && touched.toToken
              ? "border-red-300"
              : "border-gray-200"
          }`}
        >
          <div className="text-sm font-medium text-left text-gray-600 mb-3">
            Buy
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
            <input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0"
              className="text-2xl sm:text-3xl lg:text-4xl font-light bg-transparent border-none outline-none flex-1 placeholder-gray-400 text-gray-900 w-full"
              onClick={(e) => !toToken && e.stopPropagation()}
            />

            <div
              className="w-full sm:min-w-[100px] sm:max-w-[160px]"
              onClick={(e) => e.stopPropagation()}
            >
              <TokenSelector
                selectedToken={toToken}
                onTokenSelect={handleToTokenSelect}
                tokens={tokens}
                excludeToken={fromToken}
              />
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-500 text-left">
            {toToken && toAmount
              ? formatUSD(toAmount, toToken.price)
              : "$0"}
          </div>

          {errors.toToken && touched.toToken && (
            <div className="mt-2 text-sm text-red-500 font-medium">
              {errors.toToken}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-4 px-1">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSwapping}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isFormValid && !isSwapping
                ? "swap-btn-gradient"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSwapping ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Swapping...</span>
              </div>
            ) : (
              "Swap Tokens"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default SwapForm;
