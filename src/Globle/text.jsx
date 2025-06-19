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















// export const MenuItems = [
//   {
//     text: "Dashboard",
//     to: "/dashboard",
//     Icon: <MdDashboard style={{ color: colors.SOLUTYICS_PURPLE }} />,
//   },
//   {
//     text: "Sales Module",
//     to: "/sales",
//     Icon: <FcSalesPerformance style={{ color: colors.SOLUTYICS_PURPLE }} />,
//   },

//   {
//     text: "Sales Invoices",
//     to: "get/invoices",
//     Icon: <PiInvoice style={{ color: colors.SOLUTYICS_PURPLE }} />,
//   },
//   {
//     text: "Products",
//     to: "/product",
//     Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
//   },
//   {
//     text: "Tax",
//     to: "tax",
//     Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
//   },
//   {
//     text: "Customer",
//     to: "create/customer",
//     Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
//   },
//   {
//     text: "Payable",
//     to: "/payable",
//     Icon: <RiPaypalLine style={{ color: colors.SOLUTYICS_PURPLE }} />,
//   },
//   {
//     text: "Receivable",
//     to: "receivable",
//     Icon: <GiTargetDummy style={{ color: colors.SOLUTYICS_PURPLE }} />,
//   },
// ];
