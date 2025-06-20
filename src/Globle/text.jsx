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
    Icon: <FcSalesPerformance style={{ color: colors.SOLUTYICS_PURPLE }} />,
    children: [
      {
        text: "Sales OverView",
        to: "sales",
      },
      {
        text: "Sales Invoices",
        to: "/get/invoices",
      },
      {
        text: "Customers",
        to: "/create/customer",
      },
      {
        text: "Receivable",
        to: "/receivable",
      },
    ],
  },
  {
    text: "Products",
    to: "/product",
    Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
  {
    text: "Tax",
    to: "/tax",
    Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
  {
    text: "Payable",
    to: "/payable",
    Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
  },
];
