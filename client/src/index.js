import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { WalletProvider } from "@terra-money/wallet-provider";
import store from "./redux/store/index";

const mainnet = {
  name: "mainnet",
  chainID: "columbus-4",
  lcd: "https://lcd.terra.dev",
};

const testnet = {
  name: "testnet",
  chainID: "bombay-10",
  lcd: "https://bombay-lcd.terra.dev",
};

const walletConnectChainIds = {
  0: testnet,
  1: mainnet,
};

ReactDOM.render(
  <Provider store={store}>
    <WalletProvider
      defaultNetwork={testnet}
      walletConnectChainIds={walletConnectChainIds}
    >
      <App />
    </WalletProvider>
  </Provider>,
  document.getElementById("root")
);
