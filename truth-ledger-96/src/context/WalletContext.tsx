import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  reputation: number;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [reputation] = useState(850);

  const connect = useCallback(async () => {
    setConnecting(true);
    try {
      const w = window as any;
      if (w.ethereum) {
        const accounts = await w.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      } else {
        // Mock for demo
        setAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f2bD3c");
      }
    } catch (err) {
      console.error("Connection failed:", err);
      // Fallback mock
      setAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f2bD3c");
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        reputation,
        connecting,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
};
