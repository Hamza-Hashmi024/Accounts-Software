import { colors } from "../Globle/colors"


const AddInvoice = ({ label }) => {
  return (
    <button className="p-4 rounded-b-lg text-white  "
        type="submit"
        style={{
            backgroundColor: colors.SOLUTYICS_PURPLE,    
        }}
    >
           {label}
    </button>
  )
}

export default AddInvoice;