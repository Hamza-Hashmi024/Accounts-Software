import { motion } from "framer-motion";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { colors } from "../../Globle/colors";
import { MenuItems } from "../../Globle/text";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.div
      initial={{ width: 60 }}
      animate={{ width: isOpen ? 240 : 60 }}
      transition={{ duration: 0.6 }}
      style={{ background: colors.SOLUTYICS_GRAY }}
      className={`h-screen text-white p-4`}
    >
      <button onClick={() => setIsOpen((prev) => !prev)} className="mb-6">
        <FaBars />
      </button>

      <nav>
        <ul className="flex flex-col gap-4 mt-4 cursor-pointer">
          {MenuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className={`flex items-center gap-2 p-2 rounded hover:bg-white/10 transition ${
                  location.pathname === item.to ? "bg-white/10" : ""
                }`}
              >
                <span className="text-xl">{item.Icon}</span>
                <span className={`text-base font-semibold ${isOpen ? "block" : "hidden"}`}>
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;