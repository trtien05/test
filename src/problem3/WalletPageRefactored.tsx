import React, { useMemo } from "react";

// Assuming these would be imported from their respective modules
// import { BoxProps } from '@mui/material';
// import { useWalletBalances, usePrices } from './hooks';
// import { WalletRow } from './components';

// Temporary type definition for BoxProps if not available
interface BoxProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type Blockchain =
  | "Osmosis"
  | "Ethereum"
  | "Arbitrum"
  | "Zilliqa"
  | "Neo";

interface Props extends BoxProps {}

// Mock hooks - these would be imported in a real app
const useWalletBalances = (): WalletBalance[] => {
  // Mock implementation
  return [];
};

const usePrices = (): Record<string, number> => {
  // Mock implementation
  return {};
};

// Mock component - this would be imported in a real app
const WalletRow: React.FC<{
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}> = ({ className, amount, usdValue, formattedAmount }) => (
  <div className={className}>
    Amount: {formattedAmount}, USD: ${usdValue.toFixed(2)}
  </div>
);

// Mock classes - this would be imported from a styles module
const classes = {
  row: "wallet-row",
};

const WalletPageRefactored: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Memoize the priority function to avoid recreating it on every render
  const getPriority = useMemo(() => {
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };

    return (blockchain: string): number => {
      return priorityMap[blockchain] ?? -99;
    };
  }, []);

  // Combined filtering, sorting, and formatting in a single useMemo for efficiency
  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Fixed logic: keep balances with valid priority AND positive amount
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        // Sort by priority (higher first), then by amount if priorities are equal
        if (leftPriority !== rightPriority) {
          return rightPriority - leftPriority;
        }
        return rhs.amount - lhs.amount; // Secondary sort by amount (descending)
      })
      .map(
        (balance: WalletBalance): FormattedWalletBalance => ({
          ...balance,
          formatted: balance.amount.toFixed(),
        })
      );
  }, [balances, getPriority]);

  // Memoize rows to prevent unnecessary re-renders
  const rows = useMemo(() => {
    return formattedBalances.map(
      (balance: FormattedWalletBalance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={`${balance.currency}-${balance.blockchain}`} // Better key using unique combination
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      }
    );
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPageRefactored;

