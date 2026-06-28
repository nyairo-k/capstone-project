import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ellipse from "../../assets/Ellipse.png";
import handsImage from "../../assets/handsImageBlood.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // If a user is already logged in, skip the login page entirely
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) =>
        u.username === username.trim().toLowerCase() &&
        u.password === password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
      <section className="flex items-center justify-center py-[60px]">
        <div className="relative flex w-[1100px] h-[600px] rounded-[24px] overflow-hidden shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] bg-white">

          {/* Decorative ellipse top-left */}
          <img
            src={ellipse}
            alt=""
            className="absolute -top-[120px] -left-[120px] w-[400px] h-[400px] object-contain pointer-events-none select-none"
          />

          {/* Left: form */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-[60px]">
            <p className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c] text-center mb-[8px]">
              Welcome to our blood donation page
            </p>
            <h1 className="font-['Manrope',sans-serif] font-bold text-[32px] text-black text-center mb-[40px]">
              Sign In
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] w-full max-w-[360px]">
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c]">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[15px] focus:outline-none focus:border-[#D43545]"
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[15px] focus:outline-none focus:border-[#D43545]"
                />
              </div>

              <button
                type="submit"
                className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[16px] rounded-[10px] py-[14px] mt-[10px]"
              >
                Sign In
              </button>

              <p className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c] text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#D43545] font-bold">
                  Sign up now
                </Link>
              </p>

              <div className="flex items-center gap-[12px]">
                <div className="flex-1 h-[1px] bg-[#9FB8C4]/50" />
                <span className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">or</span>
                <div className="flex-1 h-[1px] bg-[#9FB8C4]/50" />
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-[12px] border border-[#9FB8C4]/50 rounded-[10px] py-[12px] font-['Roboto',sans-serif] text-[15px] text-black hover:bg-[#eeeaea] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                </svg>
                Sign in with Google
              </button>
            </form>
          </div>

          {/* Right: pink panel with hands image */}
          <div className="relative w-[400px] flex-shrink-0 bg-[#f4c9c9] overflow-hidden">
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
        </div>
      </section>

    </div>
  );
}