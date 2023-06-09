import React, {useState} from 'react'
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from 'react-router-dom';

import { useMediaQuery } from "@mui/material";






function Search() {


    const [input, setInput] = useState("");
    const navigate =useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    

    const submitHandler =(e) => {
        e.preventDefault();
        navigate('/searched/' + input )
    }
    
    console.log(input);

    

  return (
    <div>
        {isNonMobileScreens ? (
            <form className="flex h-10 items-center p-2 w-64 rounded-lg bg-white mr-2"
                onSubmit={submitHandler}
             >
             <SearchIcon className="h-5 w-5 text-gray-400" />
                <input
                 className="flex w-full ml-2 items-center bg-transparent outline-none"
                    placeholder="Find Hobbies..."
                    onChange={(e)=>setInput(e.target.value)}
                    type="text"
                 value={input}
                />
        


            </form>
        ):( 
            <form className="flex h-10 items-center w-64 rounded-lg bg-white mt-6 mx-auto"
                onSubmit={submitHandler}
            >
               <SearchIcon className="h-5 w-5 text-gray-400" />
               <input
                 className="flex w-full ml-2 items-center bg-transparent outline-none"
                  placeholder="Find Hobbies by Type..."
                 onChange={(e)=>setInput(e.target.value)}
                  type="text"
                 value={input}
                />



            </form>)}
    </div>
  )
}

export default Search