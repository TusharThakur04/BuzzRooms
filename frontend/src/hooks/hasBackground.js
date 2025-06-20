"use client";
import { useEffect, useState } from "react";

const useHeaderBackground = () => {
  const [hasBackground, sethasbackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? sethasbackground(true) : sethasbackground(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return hasBackground;
};

export default useHeaderBackground;
