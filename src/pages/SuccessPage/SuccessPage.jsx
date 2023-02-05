import React,{useRef , useState} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";

const SuccessPage = () => {
  const inputRef = useRef(null);
  const [nftminted, setNftminted] = useState(false);
  const { address } = useAccount();
  const mintNFT = () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: process.env.REACT_APP_NFTPort_API_KEY
      },
      body: JSON.stringify({
        chain: 'goerli',
        name: 'Reward NFT',
        description: 'Thank you for creaing an event !',
        file_url: 'https://ipfs.io/ipfs/bafkreib5nj66xfgciqnfshk4gubmn27dqq3wjtif6mutalp5ouj7xbaumm',
        mint_to_address: address
      })
    };
    
    fetch('https://api.nftport.xyz/v0/mints/easy/urls', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
      toast.success("NFT Minted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        theme: "dark",
      });
      setNftminted(true);
  }
  return (
    <div className="h-[85vh] bg-discount-gradient flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="font-poppins font-semibold xs:text-[36px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
          Thank you for submitting your event ! We will get back to you soon.
        </div>
        <div>
          {nftminted ? <div> <img  className= "p-1 bg-violet border rounded max-w-sm" alt = "nft"  src ="https://ipfs.io/ipfs/bafkreib5nj66xfgciqnfshk4gubmn27dqq3wjtif6mutalp5ouj7xbaumm"/> </div>  : <button
            className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
            onClick={() => mintNFT()}
          >
            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="relative z-20 flex items-center text-sm">
              <svg
                className="relative w-5 h-5 mr-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              Mint Nft
            </span>
          </button>}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
