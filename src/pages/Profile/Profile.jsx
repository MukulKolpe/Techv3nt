import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import userinfoabi from "../../utils/userinfoabi.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import "./Profile.css";
import axios from "axios";

const API_KEY = process.env.REACT_APP_GEO_API_KEY;
const api_endpoint = `http://api.openweathermap.org/geo/1.0/reverse?`;

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_pref_location: "",
  });
  const { address } = useAccount();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  useEffect(() => {
    if (!lat || !lng) return;

    axios
      .get(`${api_endpoint}lat=${lat}&lon=${lng}&limit=1&appid=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.data[0].name);
        setCity(res.data[0].name);
        setState(res.data[0].state);
        setCountry(res.data[0].country);
      });
  }, [lat, lng]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        "0x0Df39c36E8e9b462F2672498054E129416a7093D",
        userinfoabi,
        signer
    );
    const username = contract.getUsernameByWalletAddress(address);
    username.then((result)=>{
      console.log(result);
      setForm({user_name : result});
      const useremail = contract.getEmailByWalletAddress(address);
      useremail.then((result2)=>{
        console.log(result2);
        setForm({user_email : result2});
        const location = contract.getLocationByWalletAddress(address);
        location.then((result3)=>{
          console.log(result3);
          setForm({user_pref_location : result3});
        });
      });
    });
    // console.log(contract.getUsernameByWalletAddress(address));
  }, [])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  };

  const notify = () =>
    toast.success("Profile updated created successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x0Df39c36E8e9b462F2672498054E129416a7093D",
      userinfoabi,
      signer
    );

    const tx = await contract.addPerson(
      form.user_name,
      form.user_email,
      form.user_pref_location,
      address
    );

    console.log(tx);
    notify();
  };

  return (
    <div className="h-[95vh] bg-black-gradient-2">
      <div className="flex items-center justify-center flex-col">
        <div className="m-5">
          <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            {isLoading && "Loader..."}
            {/* <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-purple-600 rounded-[10px]">
              <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
                Your profile
              </h1>
            </div> */}
            <ConnectButton />
            <form
              onSubmit={handleSubmit}
              className="w-full mt-[30px] flex flex-col gap-[30px]"
            >
              <div className="flex flex-wrap gap-[30px]">
                <FormField
                  labelName="Your Name *"
                  placeholder="Your Name"
                  inputType="text"
                  value={form.user_name}
                  handleChange={(e) => handleFormFieldChange("user_name", e)}
                />
                <FormField
                  labelName="Your Email *"
                  placeholder="Enter your email"
                  inputType="text"
                  value={form.user_email}
                  handleChange={(e) => handleFormFieldChange("user_email", e)}
                />
              </div>
              <div className="location-field">
                <FormField
                  labelName="Preferred Location *"
                  placeholder={
                    city || state || country
                      ? `${city}, ${state}, ${country}`
                      : "Enter your preferred location"
                  }
                  inputType="text"
                  value={form.user_pref_location}
                  handleChange={(e) =>
                    handleFormFieldChange("user_pref_location", e)
                  }
                />
                <button onClick={() => getLocation()}>
                  <MyLocationIcon
                    fontSize="large"
                    style={{
                      color: "white",
                      marginTop: "35px",
                      marginLeft: "15px",
                    }}
                  />
                </button>
              </div>

              <div className="flex justify-center items-center mt-[20px]">
                <CustomButton
                  btnType="submit"
                  title="Update Profile"
                  styles="bg-purple-600"
                />
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
