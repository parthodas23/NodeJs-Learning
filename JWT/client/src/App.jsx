import React, { useState } from "react";
import axios from "axios";
import { config } from "dotenv";
import { jwtDecode } from "jwt-decode";
const App = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const refreshToken = async () => {
    try {
      let res = await axios.post("http://localhost:5000/api/refresh", {
        token: user.RefreshToken,
      });
      setUser({
        ...user,
        AccessToken: res.data.NewAccessToken,
        RefreshToken: res.data.NewRefreshToken,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const JWTaxios = axios.create();
  JWTaxios.interceptors.request.use(
    async (config) => {
      const currTime = new Date();
      const decoded = jwtDecode(user.AccessToken);

      if (decoded.exp * 1000 < currTime.getTime()) {
        let data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.NewAccessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      setUser(res.data);
    } catch (error) {
      console.log("Error happen", error);
    }
  };

  const handleDelete = async (userId) => {
    setSuccess(false);
    setError(false);
    try {
      await JWTaxios.delete("http://localhost:5000/api/users/" + userId, {
        headers: { authorization: "Bearer " + user.AccessToken },
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div>
      {user ? (
        <div className="w-full bg-white flex h-screen justify-center items-center ">
          <div className="w-[400px] bg-white shadow-lg p-8 border border-gray-200 rounded-2xl ">
            <h2 className="text-center text-gray-400 text-xl mb-4">
              Welcome to the {user.isAdmin ? "Admin" : "User"} dashboard{" "}
              {user.Username}
            </h2>
            <p className="font-semibold text-red-400">Delete User:</p>
            <div className="flex flex-col gap-4 rounded-2xl justify-center items-center ">
              <button
                onClick={() => handleDelete(1)}
                className="bg-red-300 py-2 px-2 rounded-2xl w-fit text-white cursor-pointer hover:bg-red-400"
              >
                Delete Admin
              </button>
              <button
                onClick={() => handleDelete(2)}
                className="bg-red-300 py-2 px-2 rounded-2xl w-fit text-white cursor-pointer hover:bg-red-400"
              >
                Delete Pritha
              </button>
            </div>
            {success && (
              <div className="text-center text-green-400 m-3">
                User has been successfully deleted.
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 m-3">
                You're not allowed to delete this user.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex h-screen justify-center items-center bg-white  ">
          <div className="w-[320px] bg-white shadow-lg border border-gray-200 p-8 rounded-2xl ">
            <h2 className="text-xl font-semibold text-teal-400 text-center mb-4">
              Api Login
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="username"
                required
                className="outline-none py-2 px-1 border-b border-gray-300 focus:border-teal-300"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                required
                className="outline-none py-2 px-1 border-b border-gray-300 focus:border-teal-300"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-teal-500 text-white px-1 py-2 rounded-lg hover:bg-teal-600 mt-5 cursor-pointer">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
