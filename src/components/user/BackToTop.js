import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-[#bacdff] text-white py-3 px-[17px] rounded-full hover:bg-[#a0b4e5] transition-opacity duration-300 ${
        visible ? "opacity-100 animate-bounce-slow" : "opacity-0 pointer-events-none"
      }`}
    >
      <FontAwesomeIcon icon={faAngleUp} />
    </button>
  );
};

export default BackToTop;
