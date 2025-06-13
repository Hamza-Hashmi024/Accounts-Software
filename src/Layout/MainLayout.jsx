import Sidebar from "../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-full overflow-auto p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default MainLayout;