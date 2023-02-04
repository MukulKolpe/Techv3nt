import React from "react";
import "./Admin.css";
import { useState, useEffect } from "react";

const Admin = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [passwd, setPasswd] = useState("");
  const [login, setLogin] = useState(false);

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
        <div className="admin-form">
          <div>
            <label htmlFor="walletAddress">Wallet Address</label>
            <input
              type="text"
              id="walletAddress"
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwd">Password</label>
            <input
              type="password"
              id="passwd"
              onChange={(e) => setPasswd(e.target.value)}
            />
          </div>
          <div>
            <button className="submit" type="submit" onClick={handleSubmit}>
              Login as Admin
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-in">Welcome back, {walletAddress}</div>
      )}
    </div>
  );
};

export default Admin;
