import React, { useState, useEffect } from "react";
import "./Admin.css";
import createEventabi from "../../utils/createeventabi.json";
import { ethers } from "ethers";
import AdminEventsCard from "../../components/AdminEventsCard";

const Admin = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [passwd, setPasswd] = useState("");
  const [login, setLogin] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x5c4860e038f037Db43d35a563aD1332427b0e4D6",
        createEventabi,
        signer
      );
      const AllEvents = contract.events(10, 0);
      AllEvents.then((result) => {
        setEvents(result);
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    };
    getEvents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      walletAddress === "0x56f20e89a0cb5097fa41695e6e15d97e1aa58092" &&
      passwd === "sarveshop"
    ) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  return (
    <div>
      {!login ? (
        <div className="relative py-16 bg-black-gradient-2">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40">
            <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12">
              <div className="rounded-3xl border border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 backdrop-blur-2xl">
                <div className="p-8 py-12 sm:p-16">
                  <h2 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">
                    Admin Login
                  </h2>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="walletAddress"
                        className="text-gray-600 dark:text-gray-300"
                      >
                        Wallet Address
                      </label>
                      <input
                        type="text"
                        id="walletAddress"
                        className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-200 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                        onChange={(e) => setWalletAddress(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="passwd"
                          className="text-gray-600 dark:text-gray-300"
                        >
                          Password
                        </label>
                      </div>
                      <input
                        type="password"
                        id="passwd"
                        onChange={(e) => setPasswd(e.target.value)}
                        className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-200 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
                      >
                        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                          Login as Admin
                        </span>
                        <span className="absolute inset-0 border-2 border-white rounded-full"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 m-2 items-center justify-center h-[85vh]">
          {events.map((item, index) => (
            <AdminEventsCard indivisualevent={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
