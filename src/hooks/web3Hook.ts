import { useState, useEffect } from 'react';
import Web3 from 'web3';

type state = {
  isLoading: boolean;
  isWeb3: boolean;
  web3: Web3 | null;
  accounts: string[];
};

const useWeb3 = (): state => {
  const [state, setState] = useState<state>({
    isLoading: true,
    isWeb3: false,
    web3: null,
    accounts: [],
  });

  useEffect(() => {
    (async () => {
      try {
        if ((window as any).ethereum) {
          const web3: Web3 = new Web3((window as any).ethereum);
          (window as any).web3 = web3;
          const accounts = await (window as any).ethereum.request({
            method: 'eth_requestAccounts',
          });
          setState((prevSate) => ({
            ...prevSate,
            isLoading: false,
            isWeb3: true,
            web3,
            accounts,
          }));
        } else if ((window as any).web3) {
          (window as any).web3 = new Web3((window as any).web3.currentProvider);
        } else {
          window.alert(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
          );
          throw new Error('Not Supported');
        }
      } catch {
        setState((prevSate) => ({
          ...prevSate,
          isLoading: false,
        }));
      }
    })();
  }, []);

  const { isLoading, isWeb3, web3, accounts } = state;
  return { isLoading, isWeb3, web3, accounts };
};
export default useWeb3;
