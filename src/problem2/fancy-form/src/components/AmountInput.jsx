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
          className={`w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-2xl font-semibold text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 ${
            readOnly
              ? "bg-gray-50 cursor-not-allowed"
              : "hover:border-blue-400"
          }`}
        />

        {token && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <img
              src={token.image}
              alt={token.symbol}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-lg font-medium text-gray-600">
              {token.symbol}
            </span>
          </div>
        )}
      </div>

      {token && value && (
        <div className="mt-2 text-sm text-gray-500">
          {formatUSD(value, token.price)}
        </div>
      )}
    </div>
  );
};

export default AmountInput;
