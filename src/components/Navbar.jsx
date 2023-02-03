import { useState ,useEffect } from "react";
import { Link } from "react-router-dom";

import { close, menu } from "../assets";
import styles from "../style";
import { Web3Auth } from "@web3auth/modal"
import { CHAIN_NAMESPACES } from "@web3auth/base"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter"
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin"
import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter"
import { MetamaskAdapter } from "@web3auth/metamask-adapter"
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter"

const clientId = process.env.REACT_APP_CLIENT_ID

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false)
  const [web3auth, setWeb3auth] = useState(null)
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    const init = async () => {
        try {
            const web3auth = new Web3Auth({
                clientId:process.env.REACT_APP_CLIENT_ID,
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: "0x5",
                    rpcTarget: "https://rpc.ankr.com/eth_goerli", // This is the public RPC we have added, please pass on your own endpoint while creating an app
                },
                uiConfig: {
                    theme: "dark",
                    loginMethodsOrder: [
                        "google",
                        "twitter",
                        "linkedin",
                        "github",
                    ],
                    defaultLanguage: "en",
                    appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg', // Your App Logo Here
                },
                web3AuthNetwork: "cyan",
            })

            const torusPlugin = new TorusWalletConnectorPlugin({
                torusWalletOpts: {
                    buttonPosition: "bottom-left",
                    showTorrusButton: provider == null ? false : true,
                },
                walletInitOptions: {
                    whiteLabel: {
                        theme: {
                            isDark: true,
                            colors: { primary: "#00a8ff" },
                        },
                        logoDark:
                            "https://web3auth.io/images/w3a-L-Favicon-1.svg",
                        logoLight:
                            "https://web3auth.io/images/w3a-D-Favicon-1.svg",
                    },
                    useWalletConnect: true,
                    enableLogging: true,
                },
            })
            await web3auth.addPlugin(torusPlugin)
            const openloginAdapter = new OpenloginAdapter({
                loginSettings: {
                    mfaLevel: "optional",
                },
                adapterSettings: {
                    whiteLabel: {
                        name: "Fundraiuser DAPP",
                        logoLight:
                            "https://www.svgrepo.com/show/120969/wallet.svg",
                        logoDark:
                            "https://www.svgrepo.com/show/120969/wallet.svg",
                        defaultLanguage: "en",
                        dark: true, // whether to enable dark mode. defaultValue: false
                    },
                },
            })
            web3auth.configureAdapter(openloginAdapter)

            // plugins and adapters are optional and can be added as per your requirement
            // read more about plugins here: https://web3auth.io/docs/sdk/web/plugins/

            // adding torus wallet connector plugin

            // read more about adapters here: https://web3auth.io/docs/sdk/web/adapters/

            // adding wallet connect v1 adapter
            const walletConnectV1Adapter = new WalletConnectV1Adapter({
                adapterSettings: {
                    bridge: "https://bridge.walletconnect.org",
                },
                clientId,
            })

            web3auth.configureAdapter(walletConnectV1Adapter)

            // adding metamask adapter
            const metamaskAdapter = new MetamaskAdapter({
                clientId,
                sessionTime: 3600, // 1 hour in seconds
                web3AuthNetwork: "cyan",
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: "0x1",
                    rpcTarget: "https://rpc.ankr.com/eth_goerli", // This is the public RPC we have added, please pass on your own endpoint while creating an app
                },
            })
            // we can change the above settings using this function
            metamaskAdapter.setAdapterSettings({
                sessionTime: 86400, // 1 day in seconds
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: "0x1",
                    rpcTarget: "https://rpc.ankr.com/eth_goerli", // This is the public RPC we have added, please pass on your own endpoint while creating an app
                },
                web3AuthNetwork: "cyan",
            })

            // it will add/update  the metamask adapter in to web3auth class
            web3auth.configureAdapter(metamaskAdapter)

            const torusWalletAdapter = new TorusWalletAdapter({
                clientId,
            })

            // it will add/update  the torus-evm adapter in to web3auth class
            web3auth.configureAdapter(torusWalletAdapter)

            setWeb3auth(web3auth)

            await web3auth.initModal()
            if (web3auth.provider) {
                setProvider(web3auth.provider)
            }
        } catch (error) {
            console.error(error)
        }
    }

    init()
}, [])

const login = async () => {
  if (!web3auth) {
      console.log("web3auth not initialized yet")
      return
  }
  const web3authProvider = await web3auth.connect()
  setProvider(web3authProvider)
  console.log("Logged in Successfully!")
}

const logout = async () => {
  if (!web3auth) {
      return
  }
  await web3auth.logout()
  setProvider(null)
}

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <nav className="w-full flex py-6 justify-between items-center navbar">
          <Link to="/" className={styles.heading3}>
            Tech
            <span
              className={`${styles.heading3} text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600`}
            >
              v3nt
            </span>
          </Link>
          <ul className="list-none sm:flex hidden justify-end items-center flex-1 ">
            <li
              className={`font-poppins font-normal text-xl cursor-pointer text-[16px] mr-7`}
            >
              <Link to="/events" className="text-white">
                Events
              </Link>
            </li>
            <li
              className={`font-poppins font-normal text-xl cursor-pointer text-[16px] mr-7`}
            >
              <Link to="/add-event" className="text-white">
                Add Events
              </Link>
            </li>
            <li>
                <button className="border-2 border-purple-600 rounded-lg px-6 py-2 text-purple-400 cursor-pointer hover:bg-purple-600 hover:text-purple-200" onClick={login}>
              Login
             </button>
             </li>
          </ul>
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle(!toggle)}
            />
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col">
                <li
                  className={`font-poppins font-normal cursor-pointer text-[16px] `}
                >
                  <Link to="/events" className="text-white">
                    Events
                  </Link>
                </li>
                <li
                  className={`font-poppins font-normal cursor-pointer text-[16px] mt-5`}
                >
                  <Link to="/add-event" className="text-white">
                    Add Events
                  </Link>
                </li>
                <li>
                <button className="border-2 border-purple-600 rounded-lg px-3 py-2 text-purple-400 cursor-pointer hover:bg-purple-600 hover:text-purple-200" onClick={login}>
              Login
             </button>
             </li>
              </ul>
             
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
