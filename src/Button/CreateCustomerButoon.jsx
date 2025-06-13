import { colors } from "../Globle/colors";
import { IoMdPersonAdd } from "react-icons/io";

const CreateCustomer = ({ onClick }) => {
  return (
    <button
      className="p-4 rounded-b-lg text-white flex items-center gap-2"
      type="button" 
      onClick={onClick} 
      style={{ backgroundColor: colors.SOLUTYICS_PURPLE }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#7a3065")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = colors.SOLUTYICS_PURPLE)
              }
    >
             <IoMdPersonAdd size={18} />
               <span>Add Customer </span>
    </button>
  );
};

export default CreateCustomer;



