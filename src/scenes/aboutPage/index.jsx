import React from 'react';
import { motion } from 'framer-motion';
import Navbar from "scenes/navbar";

function About() {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="relative w-full min-h-screen">
      <Navbar/>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
        <h2 className="z-10 text-3xl">About:</h2>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={variants}
          className="max-w-[600px] drop-shadow-2xl p-2 mt-12 rounded-lg text-lg text-white bg-black/60"
        >
          Attention all adventurers, boredom busters, and thrill-seekers! Are you ready to try something new and exciting? Look no further! Our platform is the perfect place for you to discover a new hobby and unleash your inner adventurer. From raising chickens to fishing to riding bikes, we offer a wide variety of hobbies for you to choose from. Plus, if you're passionate about your hobby and want to share your knowledge with others, this is the perfect platform for you too! Don't wait any longer, register today and start exploring your new hobby!
        </motion.p>
      </div>
      <img
        className="fixed top-0 left-0 w-full h-full object-cover overflow-hidden z-[-1]"
        src="https://cdn.osxdaily.com/wp-content/uploads/2017/06/macos-high-sierra-default-wallpaper-fall-mountain-scene-1.jpg"
        alt="/"
      />
    </div>
  );
}

export default About;