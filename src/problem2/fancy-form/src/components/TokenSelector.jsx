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
  console.log("isOpen", isOpen);
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
        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
      >
        {selectedToken ? (
          <div className="flex items-center space-x-3">
            <img
              src={selectedToken.image}
              alt={selectedToken.symbol}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">
                {selectedToken.symbol}
              </div>
            </div>
          </div>
        ) : (
          <span className="text-gray-500">Select a token</span>
        )}

        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      <Modal
        title="Select a Token"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        width={500}
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
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <button
                key={token.symbol}
                type="button"
                onClick={() => handleTokenSelect(token)}
                className="w-full px-4 py-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-150 rounded-lg"
              >
                <img
                  src={token.image}
                  alt={token.symbol}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">
                    {token.symbol}
                  </div>
                  <div className="text-sm text-gray-500">
                    {token.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    ${token.price?.toFixed(4)}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              No tokens found
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TokenSelector;
