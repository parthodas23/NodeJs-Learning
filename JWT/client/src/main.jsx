import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { config } from "dotenv";
// import { jwtDecode } from "jwt-decode";
// const App = () => {
//   const [username, setUsername] = useState(null);
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState("");

//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(false);

//   const refreshToken = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/refresh", {
//         token: user.RefreshToken,
//       });
//       setUser({
//         ...user,
//         AccessToken: res.data.NewAccessToken,
//         RefreshToken: res.data.NewRefreshToken,
//       });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const axiosJWT = axios.create();

//   axiosJWT.interceptors.request.use(
//     async (config) => {
//       const time = new Date();
//       const decoded = jwtDecode(user.AccessToken);

//       if (decoded.exp * 1000 < time.getTime()) {
//         let data = await refreshToken();
//         config.headers["authorization"] = "Bearer " + data.NewAccessToken;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/login", {
//         username,
//         password,
//       });
//       console.log("Login Successfull", res.data);
//       setUser(res.data);
//     } catch (error) {
//       console.log("Something went wrong", error);
//     }
//   };

//   const handleDelete = async (userId) => {
//     setError(false);
//     setSuccess(false);

//     try {
//       await axiosJWT.delete("http://localhost:5000/api/users/" + userId, {
//         headers: { authorization: "Bearer " + user.AccessToken },
//       });
//       setSuccess(true);
//     } catch (error) {
//       setError(true);
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <div className="w-full bg-white h-screen flex justify-center items-center ">
//           <div className="w-[400px] bg-white shadow-lg p-8 border border-gray-200 rounded-2xl">
//             <h3 className="text-xl text-center text-gray-500 mb-4">
//               {`Welcome to the ${user.isAdmin ? `Admin` : "User"} dashboard ${
//                 user.Username
//               }`}
//             </h3>
//             <p className="font-semibold text-red-400 mb-4">Delete Users:</p>
//             <div className="flex flex-col gap-6 items-center">
//               <button
//                 onClick={() => handleDelete(1)}
//                 className="w-fit py-2 px-4 text-gray-600 bg-red-200 rounded-lg cursor-pointer"
//               >
//                 Delete Partha das
//               </button>
//               <button
//                 onClick={() => handleDelete(2)}
//                 className="w-fit py-2 px-4 text-center bg-red-200 rounded-lg text-gray-600 cursor-pointer"
//               >
//                 Delete Pritha das
//               </button>
//               {error && (
//                 <span className="text-red-500">
//                   You're not allowed to delete this user!
//                 </span>
//               )}

//               {success && (
//                 <span className="text-green-400">
//                   User has been successfully deleted..........
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="w-full h-screen flex justify-center items-center bg-white">
//           <div className="w-[320px] bg-white shadow-lg p-8 rounded-2xl border border-gray-200">
//             <h2 className="text-xl text-teal-500 font-semibold text-center mb-5">
//               Api Login
//             </h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//               <input
//                 type="text"
//                 placeholder="username"
//                 required
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full py-2 px-1 border-b border-gray-300 outline-none focus:border-teal-500 "
//               />
//               <input
//                 type="password"
//                 placeholder="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full py-2 px-1 border-b border-gray-300 outline-none focus:border-teal-500"
//                 required
//               />

//               <button className="w-full text-white py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition mt-4 cursor-pointer">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
