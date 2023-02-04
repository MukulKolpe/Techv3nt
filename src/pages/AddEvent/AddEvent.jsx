import React, { useState } from "react";

import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

const AddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    event_name: "",
    event_mode: "",
    event_description: "",
    event_location: "",
    event_date: "",
    event_image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
