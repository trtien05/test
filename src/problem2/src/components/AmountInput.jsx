const AmountInput = ({
  label,
  value,
  onChange,
  token,
  readOnly = false,
  placeholder = "0.0",
  className = "",
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Only allow numbers and decimal points
    if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const formatUSD = (amount, price) => {
    if (!amount || !price || isNaN(amount)) return "$0.00";
    const usdValue = parseFloat(amount) * price;
    return `$${usdValue.toFixed(2)}`;
  };

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`amount-input ${
            readOnly
              ? "bg-gray-50 cursor-not-allowed"
              : "hover:border-blue-400"
          } ${token ? "pr-16 sm:pr-20" : ""}`}
        />

        {token && (
          <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 sm:space-x-2">
            <img
              src={token.image}
              alt={token.symbol}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
            />
            <span className="text-sm sm:text-lg font-medium text-gray-600">
              {token.symbol}
            </span>
          </div>
        )}
      </div>

      {token && value && (
        <div className="mt-2 text-xs sm:text-sm text-gray-500">
          {formatUSD(value, token.price)}
        </div>
      )}
    </div>
  );
};

export default AmountInput;
