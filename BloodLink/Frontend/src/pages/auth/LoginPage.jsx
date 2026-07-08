import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ellipse from "../../assets/Ellipse.png";
import api from "../../api/api.js";
import handsImage from "../../assets/handsImageBlood.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email,
        password
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );
      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.user)
      );

      if (response.data.user.role === "hospital") {
        navigate("/hospital/dashboard");
      } else {
        navigate("/donor/dashboard");
      }
    }
    catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="bg-[#eeeaea] min-h-screen w-full flex items-center justify-center">
      <section className="w-full flex items-center justify-center px-6">

        <div className="relative flex w-full max-w-[1300px] h-[780px] rounded-[24px] overflow-hidden shadow-[0px_20px_60px_rgba(0,0,0,0.08)] bg-white">

          <img src={ellipse} alt="" className="absolute -top-[120px] -left-[120px] w-[400px] h-[400px] object-contain pointer-events-none select-none" />

          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-12">

            <p className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c] text-center mb-[8px]">Welcome to our blood donation page</p>

            <h1 className="font-['Manrope',sans-serif] font-bold text-[32px] text-black text-center mb-[40px]">Sign In</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] w-full max-w-[360px]">

              <div className="flex flex-col gap-[8px]">
                <label className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c]">Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] text-[15px] focus:outline-none focus:border-[#D43545]" />
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c]">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] text-[15px] focus:outline-none focus:border-[#D43545]" />
              </div>

              <button type="submit" className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] text-white font-bold text-[16px] rounded-[10px] py-[14px] mt-[10px]">Sign In</button>

              <p className="text-[14px] text-[#3c3c3c] text-center">Don't have an account? <Link to="/signup" className="text-[#D43545] font-bold">Sign up now</Link></p>


            </form>
          </div>

          <div className="relative w-[420px] flex-shrink-0 bg-[#f4c9c9] overflow-hidden">

            <img src={handsImage} alt="Hands reaching out" className="absolute inset-0 w-full h-full object-cover scale-105" />

            <div className="relative z-10 h-full flex flex-col justify-between py-[40px] px-[30px]">

              <p className="text-[13px] tracking-[3px] uppercase text-white text-center font-semibold">DONATE BLOOD</p>

              <p className="text-[13px] tracking-[3px] uppercase text-white text-center font-semibold">SAVE A LIFE</p>

            </div>

          </div>

        </div>

      </section>
    </div>
  );
}