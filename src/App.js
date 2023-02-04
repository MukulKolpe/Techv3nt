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
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import ProtectedRoutes from "./components/ProtectedRoutes";

const { chains, provider } = configureChains(
  [goerli],
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
