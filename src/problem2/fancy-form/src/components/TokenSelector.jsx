import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Modal } from "antd";

const TokenSelector = ({
  label,
  selectedToken,
  onTokenSelect,
  tokens,
  excludeToken,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol !== excludeToken?.symbol &&
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTokenSelect = (token) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        data-from-token-selector={excludeToken ? undefined : true}
        data-to-token-selector={excludeToken ? true : undefined}
        className="w-full bg-white border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
      >
        {selectedToken ? (
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <img
              src={selectedToken.image}
              alt={selectedToken.symbol}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
            />
            <div className="text-left min-w-0">
              <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                {selectedToken.symbol}
              </div>
            </div>
          </div>
        ) : (
          <span className="text-gray-500 text-sm sm:text-base">
            Select a token
          </span>
        )}

        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
      </button>

      <Modal
        title="Select a Token"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        width="90vw"
        style={{ maxWidth: "500px" }}
        centered
        className="token-selector-modal"
      >
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="max-h-60 sm:max-h-96 overflow-y-auto">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <button
                key={token.symbol}
                type="button"
                onClick={() => handleTokenSelect(token)}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 flex items-center space-x-3 sm:space-x-4 hover:bg-gray-50 transition-colors duration-150 rounded-lg"
              >
                <img
                  src={token.image}
                  alt={token.symbol}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 text-left min-w-0">
                  <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {token.symbol}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 truncate">
                    {token.name}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs sm:text-sm font-medium text-gray-900">
                    ${token.price?.toFixed(4)}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
              No tokens found
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TokenSelector;
