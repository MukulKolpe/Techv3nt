import { React, useState, useEffect } from "react";
import eventsabi from "../utils/eventsabi.json";
import { ethers } from "ethers";

const EventCard = ({ indivisualevent }) => {
  const [event_image, setEvent_image] = useState("");
  const [event_name, setEvent_name] = useState("");
  const [event_description, setEvent_description] = useState("");
  const [event_date, setEvent_date] = useState("");
  const [event_location, setEvent_location] = useState("");
  const [event_mode, setEvent_mode] = useState("");
  const [event_isVerified, setEvent_isVerified] = useState(false);

  useEffect(() => {
    const getEventDetails = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(indivisualevent, eventsabi, signer);
      contract
        .name()
        .then((result) => {
          setEvent_name(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .description()
        .then((result) => {
          setEvent_description(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .imageURL()
        .then((result) => {
          setEvent_image(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .location()
        .then((result) => {
          setEvent_location(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .mode()
        .then((result) => {
          setEvent_mode(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .date()
        .then((result) => {
          setEvent_date(result);
        })
        .catch((err) => {
          console.log(err);
        });

      contract
        .isVerified()
        .then((result) => {
          setEvent_isVerified(result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getEventDetails();
  }, []);
  return (
    <div>
      {event_isVerified && (
        <div
          className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
          onClick={() => {}}
        >
          <img
            src={event_image}
            alt="fund"
            className="w-full h-[158px] object-cover rounded-[15px]"
          />

          <div className="flex flex-col p-4">
            <div className="flex flex-row items-center mb-[18px]">
              <img
                src="https://compile.blog/wp-content/uploads/2021/11/Web3-Icon-3.png"
                alt="tag"
                className="w-[17px] h-[17px] object-contain"
              />
              <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
                Technology
              </p>
            </div>

            <div className="block">
              <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
                {event_name}
              </h3>
              <p className="mt-[5px] truncate font-epilogue font-normal text-[#808191] text-left leading-[18px]">
                {event_description}
              </p>
            </div>

            <div className="flex justify-between flex-wrap mt-[15px] gap-2">
              <div className="flex flex-col">
                <h4 className="font-epilogue font-semibold text-[15px] text-[#b2b3bd] leading-[22px]">
                  {event_location}
                </h4>
                <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                  {/* Raised of {target} */}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="mt-[3px] font-epilogue font-semibold text-[15px] leading-[22px] text-[#b2b3bd] sm:max-w-[120px] ">
                  {event_date}
                </p>
              </div>
            </div>

            <div className="flex items-center mt-[20px] gap-[12px]">
              <div className="w-[10px] h-[10px] rounded-full flex justify-center items-center bg-[#dddde3]"></div>
              <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
                <span className="text-[#b2b3bd]">{event_mode}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
