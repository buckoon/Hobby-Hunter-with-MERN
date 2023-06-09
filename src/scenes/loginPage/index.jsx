import React, { useState } from "react";
import Form from "./Form";
import Hero from "./Hero";


function LoginPage() {
  

  const handleEmailFocus = () => {
    alert(
      "If you do not wish to register with your email, you can sign in with the email: lisa@gmail.com and password: abcabc"
    );
  };


  

  return (
    
      <div className="bg-cover bg-center bg-fixed bg-opacity-80 bg-gradient-to-r bg-deep-blue #010026">

        <Hero />
        <div className="grid grid-cols-1  bg-cover bg-center bg-fixed bg-opacity-80 bg-gradient-to-r
         from-blue-100 to-green-100 md:grid-cols-2 gap-8 mx-auto py-20 px-6 md:px-32 items-center">
          <Form/>

          <div className="hidden md:block">
           <img
            className="w-full h-auto rounded-lg  border-2 border-gray-400 object-cover"
           src="../assets/samplepic.png"
            alt="login pic"

          
            />
          </div>


        </div>
        


      </div>
  );
}

export default LoginPage