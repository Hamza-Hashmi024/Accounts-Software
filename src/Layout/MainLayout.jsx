import Sidebar from "../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";

const MainLayout = () => {
  return (
    // <div className="flex h-screen overflow-hidden">
    //   <Sidebar />
    //   <div className="flex-1 h-full overflow-auto p-6">
    //     <Outlet /> 
    //   </div>
    // </div>
    <>
      <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navbar */}
        <div className="sticky top-0 z-10 bg-white shadow">
          <NavBar />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
};

export default MainLayout;