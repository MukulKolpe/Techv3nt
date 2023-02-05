import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { close, menu } from "../assets";
import styles from "../style";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const clientId = process.env.REACT_APP_CLIENT_ID;

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const { address, isConnected } = useAccount();

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
            <li
              className={`font-poppins font-normal text-xl cursor-pointer text-[16px] mr-7`}
            >
              <Link to="/profile" className="text-white">
                Profile
              </Link>
            </li>
            <li>
              {/* <ConnectButton /> */}
              {!isConnected ? (
                <div>
                  <Link
                    to={"/profile"}
                    className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                  >
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                      Connect Wallet
                    </span>
                  </Link>
                </div>
              ) : (
                <ConnectButton />
              )}
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
                <li
                  className={`font-poppins font-normal text-xl cursor-pointer text-[16px] mr-7`}
                >
                  <Link to="/profile" className="text-white">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/profile"}
                    className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                  >
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                      Connect Wallet
                    </span>
                  </Link>
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
