import React, { useState } from "react";
import { useDispatch} from "react-redux";
import SearchBox from "components/SearchBox";


import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {  setLogout } from "state";

function Navbar() {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);

  const handleClick = () => {
    setNav(!nav);
  };

  const logoutOfApp = () => {
    dispatch(setLogout());
    
  };

  return (
    <div className="h-[80px] z-10 bg-zinc-200 sticky drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4 sm:text-4xl">Hobby Hunter</h1>
          <ul className="hidden md:flex">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/About">About</NavLink>
            </li>
          </ul>
        </div>
        <div className=" items-center hidden md:flex">
          <SearchBox/>
          <div className="flex">
            <button
              className="px-3 py-2 text-white rounded-lg font-medium hover:bg-red-600 transition mr-2 duration-150 ease-in-out ml-2 lg:ml-5 text-sm lg:text-base"
              onClick={logoutOfApp}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="md:hidden" onClick={handleClick}>
          {!nav ? (
            <MenuIcon className="w-5 cursor-pointer" />
          ) : (
            <CloseIcon className="w-5 cursor-pointer" />
          )}
        </div>
      </div>
      <div className="md:hidden">
        <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
          <li className="border-b-2 border-zinc-300 w-full">
            <NavLink to="/Home">Home</NavLink>
          </li>
          <li className="border-b-2 border-zinc-300 w-full">
            <NavLink to="/About">About</NavLink>
          </li>
          <li className="border-b-2 border-zinc-300 w-full">
            <NavLink to="/Tools">Tools</NavLink>
          </li>
          
          <button
            className="px-3 py-2 text-white rounded-lg font-medium hover:bg-red-600 transition mr-2 duration-150 ease-in-out ml-2 lg:ml-5 text-sm lg:text-base mb-4 mt-4"
            onClick={logoutOfApp}
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
