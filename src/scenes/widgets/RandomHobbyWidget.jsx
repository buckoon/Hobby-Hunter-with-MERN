import React, { useState, useEffect } from "react";
import {Divider} from "@mui/material";

function Activities() {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const storedActivity = localStorage.getItem("activity");
    if (storedActivity) {
      setActivity(storedActivity);
    }
  }, []);
  

  const handleButtonClick = async () => {
    try {
      const response = await fetch("https://www.boredapi.com/api/activity/");
      const data = await response.json();
      setActivity(data.activity);
      localStorage.setItem("activity", data.activity);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-[150px] flex-col justify-content shadow-xl items-center bg-zinc-200 mt-3 top-[80px] rounded-lg text-black text-center border-b border-gray-600 w-[100%] ">
      <div className="flex flex-col pt-4 pb-2 px-2 h-[190px] overflow-hidden">
        <div className="flex justify-center"> {/* Add justify-center class */}
          <button
            className="text-white border bg-indigo-600 border-indigo-600 
            hover:bg-indigo-300 transition-all duration-200 hover:shadow-xl rounded-md w-[230px] font-bold py-2 px-2 mb-2 focus:outline-none focus:ring-2"
            onClick={handleButtonClick}
          >
            Get Random Hobby
          </button>
        </div>
        <Divider sx={{ margin: ".25rem 0" }} />
        <span className="text-black">{activity}</span>
      </div>
    </div>
  );
  
}

export default Activities;