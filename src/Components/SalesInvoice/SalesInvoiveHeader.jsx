// import React, { useState } from 'react';
// import Solutyics from '../../assets/Solutyics.png';
// import { colors } from '../../Globle/colors';
// import CreateCustomer from '../../Button/CreateCustomerButoon';
// import { useNavigate } from 'react-router-dom';

// const SalesInvoiveHeader = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState('');

//   const handleCreateCustomer = () => {
//     navigate('/create/customer');
//   };

//   return (
//     <div
//       className="flex justify-between items-center p-4 rounded shadow"
//       style={{ backgroundColor: colors.GRAY_COLOR }}
      
//     >
//       <div className="flex items-center space-x-4">
//         <img src={Solutyics} alt="Solutyics Logo" className="h-10" />
//         <input
//           type="text"
//           placeholder="Search customer..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border rounded px-3 py-1 text-black"
//           style={{ backgroundColor: colors.WHITE_COLOR }}
//         />
//       </div>
//       <CreateCustomer onClick={handleCreateCustomer} />
//     </div>
//   );
// };

// export default SalesInvoiveHeader;
