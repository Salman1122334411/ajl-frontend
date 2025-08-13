import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { AppContext } from "../context/AppContext";
import { useAdmin } from "../context/AdminContext";

const LoginPage = () => {
  const { addUser, loginUser } = useContext(AppContext);
  const { login: adminLogin } = useAdmin();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && (!name || !phone))) {
      toast.error("All fields are required!");
      return;
    }
    // Admin login
    if (email === "admin@gmail.com" && password === "1122admin1122") {
      const isAdmin = await adminLogin(email, password);
      if (isAdmin) {
        toast.success("Admin logged in!");
        navigate("/");
        return;
      } else {
        toast.error("Invalid admin credentials!");
        return;
      }
    }
    if (isLogin) {
      const success = loginUser(email, password);
      if (success) {
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error("Invalid email or password!");
      }
    } else {
      const registrationDate = new Date().toISOString();
      addUser({ name, email, password, phone, registrationDate });
      toast.success("Registered successfully!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-[-70px] text-center mb-10">
        Welcome to <span className="text-red-600">AJL Tours</span>
      </h1>
      <div className="bg-white/20 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-black">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={onSubmitHandler} className="space-y-4 mt-6">
          {!isLogin && (
            <>
            <div>
              <label htmlFor="name" className="block text-md font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your full name"
              />
            </div>
              <div>
                <label htmlFor="phone" className="block text-md font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your phone number"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-md font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-md font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="button-31 w-full text-lg">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p>
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Register here
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login here
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
