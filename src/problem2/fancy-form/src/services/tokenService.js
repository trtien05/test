import axios from 'axios';

const PRICES_API_URL = 'https://interview.switcheo.com/prices.json';

// Function to get all available token images
export const getAvailableTokens = async () => {
  try {
    // Get token images from the images folder
    const imageModules = import.meta.glob('../assets/images/*.svg', { eager: true });
    const tokenImages = {};

    Object.entries(imageModules).forEach(([path, module]) => {
      const fileName = path.split('/').pop().replace('.svg', '');
      tokenImages[fileName] = module.default || module;
    });

    return tokenImages;
  } catch (error) {
    console.error('Error loading token images:', error);
    return {};
  }
};

// Function to fetch token prices
export const fetchTokenPrices = async () => {
  try {
    const response = await axios.get(PRICES_API_URL);
    const prices = response.data;

    // Create a map of latest prices for each currency
    const priceMap = {};
    prices.forEach(item => {
      if (!priceMap[item.currency] || new Date(item.date) > new Date(priceMap[item.currency].date)) {
        priceMap[item.currency] = item;
      }
    });

    return priceMap;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return {};
  }
};

// Function to get tokens with both prices and images
export const getSwappableTokens = async () => {
  try {
    const [tokenImages, tokenPrices] = await Promise.all([
      getAvailableTokens(),
      fetchTokenPrices()
    ]);

    const swappableTokens = [];

    Object.keys(tokenImages).forEach(token => {
      if (tokenPrices[token]) {
        swappableTokens.push({
          symbol: token,
          name: token,
          image: tokenImages[token],
          price: tokenPrices[token].price,
          lastUpdated: tokenPrices[token].date
        });
      }
    });

    // Sort by symbol
    return swappableTokens.sort((a, b) => a.symbol.localeCompare(b.symbol));
  } catch (error) {
    console.error('Error getting swappable tokens:', error);
    return [];
  }
};

// Function to calculate exchange rate between two tokens
export const calculateExchangeRate = (fromToken, toToken) => {
  if (!fromToken || !toToken || !fromToken.price || !toToken.price) {
    return 0;
  }
  return fromToken.price / toToken.price;
};

// Function to calculate output amount
export const calculateOutputAmount = (inputAmount, fromToken, toToken) => {
  if (!inputAmount || !fromToken || !toToken) {
    return 0;
  }

  const rate = calculateExchangeRate(fromToken, toToken);
  return inputAmount * rate;
};