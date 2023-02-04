import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import userinfoabi from "../../utils/userinfoabi.json"
import {ethers} from "ethers"
import {useAccount} from 'wagmi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_pref_location: "",
  });
  const {address} =useAccount()

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const notify = () => toast.success('Profile updated created successfully!', {
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
    e.preventDefault()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      "0x10fD0cA6329dC52F9892F3CEE22cA9c2c69CAb4d",
      userinfoabi,
      signer
  );

  const tx = await contract.addPerson(
     form.user_name,
     form.user_email,
     form.user_pref_location,
     address
  )

  console.log(tx)
  notify()

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

              <FormField
                labelName="Preferred Location *"
                placeholder="Your Preferred Location"
                inputType="text"
                value={form.user_pref_location}
                handleChange={(e) =>
                  handleFormFieldChange("user_pref_location", e)
                }
              />
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
