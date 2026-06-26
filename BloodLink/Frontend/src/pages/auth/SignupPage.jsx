import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ellipse from "../../assets/Ellipse.png";
import handsImage from "../../assets/handsImageBlood.png";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.password) {
      alert("Please fill in all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const username = (form.firstName + form.lastName).toLowerCase().replace(/\s/g, "");

    const usernameExists = users.some((u) => u.username === username);
    if (usernameExists) {
      alert("An account with this name already exists. Try logging in instead.");
      return;
    }

    const newUser = {
      username,
      firstName: form.firstName,
      lastName: form.lastName,
      age: form.age,
      gender: form.gender,
      password: form.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert(`Account created! Your username is "${username}". Use it to log in.`);
    navigate("/login");
  };

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
      <Navbar />

      <section className="flex items-center justify-center py-[60px]">
        <div className="relative flex w-[1100px] h-[680px] rounded-[24px] overflow-hidden shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] bg-[#eeeaea]">

          {/* Decorative ellipse top-left */}
          <img
            src={ellipse}
            alt=""
            className="absolute -top-[120px] -left-[120px] w-[400px] h-[400px] object-contain pointer-events-none select-none"
          />

          {/* Pink panel with hands image, right side */}
          <div className="absolute right-0 top-0 w-[400px] h-full overflow-hidden bg-[#f4c9c9]">
            <img
              src={handsImage}
              alt="Hands reaching out"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 h-full flex flex-col justify-between py-[40px] px-[30px]">
              <p className="font-['Manrope',sans-serif] text-[13px] tracking-[3px] uppercase text-white text-center font-semibold">
                Donate Blood
              </p>
              <p className="font-['Manrope',sans-serif] text-[13px] tracking-[3px] uppercase text-white text-center font-semibold">
                Save A Life
              </p>
            </div>
          </div>

          {/* White form card, floating on top of the split background */}
          <div className="relative z-20 m-auto bg-white rounded-[16px] shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] p-[32px] w-[520px]">

            <h1 className="font-['Manrope',sans-serif] font-bold text-[24px] text-black text-center mb-[24px]">
              Sign Up Form
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
              <div className="flex gap-[14px]">
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="px-[14px] py-[10px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545]"
                  />
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="px-[14px] py-[10px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className="px-[14px] py-[10px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545]"
                />
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="px-[14px] py-[10px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545]"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex gap-[14px]">
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="px-[14px] py-[10px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545]"
                  />
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="px-[14px] py-[10px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[15px] rounded-[10px] py-[12px] mt-[4px]"
              >
                Sign Up
              </button>

              <p className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c] text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-[#D43545] font-bold">
                  Log in
                </Link>
              </p>

              <div className="flex items-center gap-[12px]">
                <div className="flex-1 h-[1px] bg-[#9FB8C4]/50" />
                <span className="font-['Roboto',sans-serif] text-[12px] text-[#3c3c3c]">or</span>
                <div className="flex-1 h-[1px] bg-[#9FB8C4]/50" />
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-[10px] border border-[#9FB8C4]/50 rounded-[10px] py-[10px] font-['Roboto',sans-serif] text-[14px] text-black hover:bg-[#eeeaea] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                </svg>
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}