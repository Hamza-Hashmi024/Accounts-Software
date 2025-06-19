import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaChevronDown, FaChevronUp, FaCircle } from "react-icons/fa";
import { colors } from "../../Globle/colors";
import { MenuItems } from "../../Globle/text";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({});
  const location = useLocation();

  // Auto-open dropdown if a child is active
  useEffect(() => {
    MenuItems.forEach((item, index) => {
      if (item.children) {
        const isChildActive = item.children.some((child) => location.pathname === child.to);
        if (isChildActive) {
          setDropdowns((prev) => ({ ...prev, [index]: true }));
        }
      }
    });
  }, [location.pathname]);

  const toggleDropdown = (index) => {
    setDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <motion.div
      initial={{ width: 60 }}
      animate={{ width: isOpen ? 240 : 60 }}
      transition={{ duration: 0.6 }}
      style={{ background: colors.SOLUTYICS_GRAY }}
      className="h-screen text-white p-4 overflow-auto"
    >
      <button onClick={() => setIsOpen((prev) => !prev)} className="mb-6">
        <FaBars />
      </button>

      <nav>
        <ul className="flex flex-col gap-2 mt-4 cursor-pointer">
          {MenuItems.map((item, index) => (
            <li key={index}>
              {item.children ? (
                <>
                  {/* Dropdown Toggle */}
                  <div
                    onClick={() => toggleDropdown(index)}
                    className={`flex justify-between items-center gap-2 p-2 rounded hover:bg-white/10 transition ${
                      dropdowns[index] ? "bg-white/10" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.Icon}</span>
                      {isOpen && <span className="text-base font-semibold">{item.text}</span>}
                    </div>
                    {isOpen &&
                      (dropdowns[index] ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />)}
                  </div>

                  {/* Dropdown Content */}
                  {dropdowns[index] && isOpen && (
                    <ul className="ml-7 mt-1 space-y-1 border-l  pl-3"
                   style={{ borderColor: "#993f82" }}
                    >
                      {item.children.map((child, childIdx) => (
                        <li key={childIdx}>
                          <Link
                            to={child.to}
                            className={`flex items-center gap-2 px-1 py-2 rounded text-sm hover:bg-white/10 transition ${
                              location.pathname === child.to ? "bg-white/10 font-semibold" : ""
                            }`}
                          >
                            <FaCircle size={12} color={colors.SOLUTYICS_PURPLE} />
                            <span>{child.text}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Regular Menu Item
                <Link
                  to={item.to}
                  className={`flex items-center gap-2 p-2 rounded hover:bg-white/10 transition ${
                    location.pathname === item.to ? "bg-white/10" : ""
                  }`}
                >
                  <span className="text-xl">{item.Icon}</span>
                  {isOpen && <span className="text-base font-semibold">{item.text}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;



