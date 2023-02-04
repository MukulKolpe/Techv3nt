import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AddEvent from "./pages/AddEvent/AddEvent";
import Admin from "./pages/Admin/Admin";
import Events from "./pages/Events/Events";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Chain ,goerli } from 'wagmi/chains';

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import ProtectedRoutes from "./components/ProtectedRoutes";

const fireChain: Chain = {
  id: 997,
  name: '5ire',
  network: '5ire Network',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: '5ire',
    symbol: '5ire',
  },
  rpcUrls: {
    default: {
      http: ['https://chain-node.5ire.network/'],
    },
  },
  blockExplorers: {
    default: { name: 'FireNetwork', url: 'https://explorer.5ire.network' },
  },
  testnet: true,
};


const { chains, provider } = configureChains(
  [goerli , fireChain],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({ accentColor: "#7b3fe4" })}
        >
          <Router>
            <Navbar />
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Profile />} path="/profile" />
              <Route element={<ProtectedRoutes />}>
                <Route element={<Admin />} path="/admin" />
                <Route element={<Profile />} path="/profile" />
                <Route element={<AddEvent />} path="/add-event" />
                <Route element={<Events />} path="/events" />
              </Route>
            </Routes>
            <Footer />
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
