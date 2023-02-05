import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import createEventabi from "../../utils/createeventabi.json";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const AddEvent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    event_name: "",
    event_mode: "",
    event_description: "",
    event_location: "",
    event_date: "",
    event_image: "",
    event_registration: 0,
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const notify = () =>
    toast.success("Event created successfully!", {
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
    console.log(form);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    console.log(accounts);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x5c4860e038f037Db43d35a563aD1332427b0e4D6",
      createEventabi,
      signer
    );
    const tx = await contract.createEvent(
      form.event_name,
      form.event_description,
      form.event_image,
      form.event_location,
      form.event_mode,
      accounts[0],
      form.event_date,
      form.event_registration
    );
    console.log(tx);
    notify();
    navigate("/success");
  };

  return (
    <div className="m-5">
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        {isLoading && "Loader..."}
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Create Event
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Event Name *"
              placeholder="Name of the Event"
              inputType="text"
              value={form.event_name}
              handleChange={(e) => handleFormFieldChange("event_name", e)}
            />
            <FormField
              labelName="Event Mode *"
              placeholder="Mode of conduction of event"
              inputType="text"
              value={form.event_mode}
              handleChange={(e) => handleFormFieldChange("event_mode", e)}
            />
          </div>
          <FormField
            labelName="Event Description *"
            placeholder="Write your event's description"
            isTextArea
            value={form.event_description}
            handleChange={(e) => handleFormFieldChange("event_description", e)}
          />
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Event Location *"
              placeholder="Place where the event will be held"
              inputType="text"
              value={form.event_location}
              handleChange={(e) => handleFormFieldChange("event_location", e)}
            />
            <FormField
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form.event_date}
              handleChange={(e) => handleFormFieldChange("event_date", e)}
            />
          </div>
          <FormField
            labelName="Add maximum number of participants *"
            placeholder="Number of participants"
            inputType="number"
            value={form.event_registration}
            handleChange={(e) => handleFormFieldChange("event_registration", e)}
          />
          <FormField
            labelName="Add event thumbnail *"
            placeholder="Place image URL of your event"
            inputType="text"
            value={form.event_image}
            handleChange={(e) => handleFormFieldChange("event_image", e)}
          />
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="Add Event"
              styles="bg-[#1dc071]"
            />
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
