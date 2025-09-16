# Cryptocurrency Token Swap Application

A modern, responsive React application for swapping cryptocurrency tokens with real-time pricing and elegant UI design.

## 📋 Project Overview

This is a sophisticated token swap interface built with React that allows users to exchange cryptocurrencies. The application features a sleek design with real-time price calculations, comprehensive form validation, and smooth user interactions.

## ✨ Key Features

### 🔄 Token Swapping

- **Interactive Swap Interface**: Clean, intuitive UI for selecting tokens and entering amounts
- **Real-time Price Calculation**: Automatic conversion between tokens based on live pricing data
- **Bidirectional Swapping**: Easy token reversal with animated swap button
- **Smart Validation**: Prevents same-token swaps and validates input amounts

### 🎨 Modern UI/UX

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Gradient Backgrounds**: Beautiful gradient effects with grid overlay patterns
- **Smooth Animations**: Loading states, hover effects, and transitions
- **Ant Design Integration**: Professional modal dialogs and notification system

### 🪙 Token Management

- **150+ Supported Tokens**: Extensive library of cryptocurrency icons and data
- **Live Price Data**: Integration with Switcheo API for real-time pricing
- **Token Search**: Fast search functionality in token selection modal
- **Visual Token Display**: High-quality SVG icons for all supported cryptocurrencies

### 📱 User Experience

- **Form Validation**: Real-time validation with error messaging
- **Loading States**: Elegant loading animations during operations
- **Success Notifications**: Toast messages for successful transactions
- **Accessibility**: Proper focus management and keyboard navigation

## 🏗️ Technical Architecture

### Frontend Stack

- **React 19.1.1**: Latest React with hooks and modern patterns
- **Vite 7.1.2**: Lightning-fast build tool and dev server
- **Tailwind CSS 4.1.13**: Utility-first CSS framework for styling
- **Ant Design 5.27.3**: Professional React UI component library
- **Lucide React**: Beautiful, customizable SVG icons

### Project Structure

```
src/
├── components/           # React components
│   ├── SwapForm.jsx     # Main swap interface with all logic
│   ├── TokenSelector.jsx # Token selection modal component
│   ├── FancyContainer.jsx # Layout wrapper with gradient design
│   └── AmountInput.jsx   # Custom amount input component
├── services/            # Business logic and API calls
│   └── tokenService.js  # Token data fetching and processing
├── assets/              # Static assets
│   └── images/          # 150+ cryptocurrency SVG icons
└── App.jsx              # Main application component
```

### Key Components

#### SwapForm Component

- **State Management**: Comprehensive state handling for tokens, amounts, validation
- **Real-time Calculations**: Automatic price conversion using token prices
- **Form Validation**: Multi-layer validation with error handling
- **User Interactions**: Click handlers, form submission, token swapping

#### TokenSelector Component

- **Modal Interface**: Professional token selection with search functionality
- **Dynamic Filtering**: Real-time search across token names and symbols
- **Visual Design**: Token icons, names, and live price display
- **Accessibility**: Keyboard navigation and proper focus management

#### Token Service

- **Price Integration**: Fetches live data from Switcheo API
- **Image Management**: Dynamic loading of token SVG assets
- **Data Processing**: Combines price data with visual assets
- **Error Handling**: Graceful fallbacks for API failures

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd fancy-form

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎯 Features in Detail

### Smart Form Validation

- **Amount Validation**: Ensures positive numbers and valid formats
- **Token Selection**: Prevents invalid token combinations
- **Real-time Feedback**: Immediate validation feedback as users type
- **Error States**: Clear error messaging with visual indicators

### Responsive Design

- **Mobile-First**: Optimized for mobile devices with touch-friendly interfaces
- **Breakpoint Optimization**: Tailored layouts for different screen sizes
- **Flexible Typography**: Scalable text sizes across device ranges
- **Touch Interactions**: Enhanced mobile experience with proper touch targets

### Performance Optimization

- **Vite Build System**: Fast development and optimized production builds
- **Code Splitting**: Efficient bundle splitting for faster loading
- **Image Optimization**: SVG assets for crisp icons at any size
- **API Caching**: Intelligent caching of token price data

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom gradient configurations and responsive design utilities. The main styles are defined in `src/index.css` with custom classes for specific components.

### API Integration

Token prices are fetched from the Switcheo API endpoint:

```javascript
const PRICES_API_URL = "https://interview.switcheo.com/prices.json";
```

### Build Configuration

Vite configuration includes React SWC plugin for fast refresh and optimized builds. The project supports modern ES modules and includes proper development/production configurations.

## 🎨 Design System

### Color Palette

- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Secondary**: Purple gradient (#8b5cf6 to #6d28d9)
- **Background**: Clean white with subtle grid patterns
- **Text**: Semantic gray scale for hierarchy

### Typography

- **Headings**: Bold gradient text with letter spacing
- **Body**: System font stack for optimal readability
- **Interactive**: Appropriate font weights for different states

### Spacing & Layout

- **Grid System**: 48px grid overlay for visual structure
- **Component Spacing**: Consistent padding and margins
- **Responsive Breakpoints**: Tailwind's standard breakpoint system

## 🔄 Future Enhancements

- **Wallet Integration**: Connect with Web3 wallets for real transactions
- **Transaction History**: Track and display swap history
- **Advanced Charts**: Price charts and market data visualization
- **Multi-language Support**: Internationalization for global users
- **Dark Mode**: Alternative color scheme option
- **Slippage Settings**: Advanced trading parameters

## 📝 Development Notes

This project demonstrates modern React development practices including:

- Functional components with hooks
- Proper state management and side effects
- Component composition and reusability
- Modern CSS with Tailwind utilities
- API integration and error handling
- Responsive design principles
- Accessibility considerations

The codebase follows React best practices with clean component separation, proper prop validation, and maintainable code structure.
