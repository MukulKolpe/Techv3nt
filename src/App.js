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
import { Chain, goerli } from "wagmi/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import ProtectedRoutes from "./components/ProtectedRoutes";
import SuccessPage from "./pages/SuccessPage/SuccessPage";

const fireChain: Chain = {
  id: 997,
  name: "5ire",
  network: "5ire Network",
  iconUrl:
    "https://5ire.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F844afe5f-3320-4342-8de3-3a3f72b47e5c%2FYqPdVlSA_400x400.jpeg?table=block&id=3b0c51d9-c1e3-46b7-8722-597f68dd6167&spaceId=3b3e9e83-94fd-4ad6-a9a2-f0376069eab0&width=250&userId=&cache=v2",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "5ire",
    symbol: "5ire",
  },
  rpcUrls: {
    default: {
      http: ["https://chain-node.5ire.network/"],
    },
  },
  blockExplorers: {
    default: { name: "FireNetwork", url: "https://explorer.5ire.network" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [goerli, fireChain],
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
                <Route element={<SuccessPage />} path="/success" />
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
