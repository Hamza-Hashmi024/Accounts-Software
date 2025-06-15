import { MdDashboard } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { PiInvoice } from "react-icons/pi";
import { RiPaypalLine } from "react-icons/ri";
import { GiTargetDummy } from "react-icons/gi";
import { colors } from "./colors";

export const MenuItems = [
  {
    text: "Dashboard",
    to: "/dashboard",
    Icon: <MdDashboard style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
  {
    text: "Sales Module",
    to: "/sales",
    Icon: <FcSalesPerformance style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
  {
    text: "Sales Invoice",
    to: "/invoice",
    Icon: <PiInvoice style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
  {
    text: "Products",
    to: "/product",
    Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
  {
    text: "Customer",
    to: "create/customer",
    Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
  {
    text: "Payable",
    to: "/payable",
    Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
  {
    text: "Receivable",
    to: "receivable",
    Icon: <GiTargetDummy style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
];
