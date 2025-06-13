import React from "react";
import { colors } from "../Globle/colors";
import { IoSearch } from "react-icons/io5";

const SearchButton = ({ label , onClick } ) => {
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className="p-3 px-5 flex items-center gap-2 rounded-full transition duration-200"
        style={{
          backgroundColor: colors.SOLUTYICS_PURPLE,
          color: colors.WHITE_COLOR,
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#7a3065")}
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = colors.SOLUTYICS_PURPLE)
        }
      >
        <IoSearch size={18} />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default SearchButton;
