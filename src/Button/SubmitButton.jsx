import { useSelector } from "react-redux";
import { colors } from "../Globle/colors";

const SubmitButton = ({ onClick }) => {
  const { isLoading } = useSelector((state) => state.SalesInvoice);

  return (
    <button
      disabled={isLoading}
    onClick ={ onClick }
      className={`mt-6 px-6 py-2 font-semibold rounded shadow text-white transition duration-300 ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "hover:opacity-90"
      }`}
      style={{
        backgroundColor: isLoading ? colors.GRAY_COLOR : colors.SOLUTYICS_PURPLE,
      }}
    >
      {isLoading ? "Submitting..." : "Submit Invoice"}
    </button>
  );
};

export default SubmitButton;



