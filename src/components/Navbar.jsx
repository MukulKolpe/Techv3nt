import { useState } from "react";
import { Link } from "react-router-dom";

import { close, menu } from "../assets";
import styles from "../style";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

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
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
