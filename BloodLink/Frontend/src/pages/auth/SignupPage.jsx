import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ellipse from "../../assets/Ellipse.png";
import handsImage from "../../assets/handsImageBlood.png";

const API_BASE = "http://localhost:5000"; // TODO: update for production

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const inputClass =
  "px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545]";
const labelClass = "font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c]";

export default function SignupPage() {
  const [userType, setUserType] = useState("");
  const [form, setForm] = useState({
    // donor fields
    fullName: "",
    email: "",
    age: "",
    gender: "",
    bloodType: "",
    location: "",
    // hospital fields
    hospitalName: "",
    phoneNumber: "",
    hospitalEmail: "",
    hospitalLocation: "",
    // shared
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userType) {
      alert("Please select whether you are signing up as a Donor or Hospital");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (userType === "donor") {
        if (!form.fullName || !form.email || !form.bloodType || !form.password) {
          alert("Please fill in all required fields");
          return;
        }

        // POST /donors
        const res = await fetch(`${API_BASE}/donors`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: form.fullName,
            email: form.email.trim().toLowerCase(),
            password_hash: form.password,   // stored as plain text for now — TODO: hash with bcrypt
            blood_type: form.bloodType,
            age: form.age ? parseInt(form.age) : null,
            gender: form.gender || null,
            location: form.location || null,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          alert(err.error || err.message || "Registration failed. Please try again.");
          return;
        }

        alert("Donor account created! You can now log in.");
        navigate("/login");

      } else {
        if (!form.hospitalName || !form.hospitalEmail || !form.password) {
          alert("Please fill in all required fields");
          return;
        }

        // POST /hospitals
        const res = await fetch(`${API_BASE}/hospitals`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hospital_name: form.hospitalName,
            email: form.hospitalEmail.trim().toLowerCase(),
            password: form.password,         // backend key is "password", stored as password_hash
            phone_number: form.phoneNumber || null,
            location: form.hospitalLocation || null,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          alert(err.error || err.message || "Registration failed. Please try again.");
          return;
        }

        alert("Hospital account created! You can now log in.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">

      <section className="flex items-center justify-center py-[60px]">
        <div className="relative flex w-[1100px] rounded-[24px] overflow-hidden shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] bg-white">

          {/* Decorative ellipse */}
          <img
            src={ellipse}
            alt=""
            className="absolute -top-[120px] -left-[120px] w-[400px] h-[400px] object-contain pointer-events-none select-none"
          />

          {/* Left: form */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-[60px] py-[50px]">
            <p className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c] text-center mb-[8px]">
              Join our blood donation community
            </p>
            <h1 className="font-['Manrope',sans-serif] font-bold text-[32px] text-black text-center mb-[32px]">
              Sign Up
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[400px]">

              {/* Role selector */}
              <div className="flex flex-col gap-[8px]">
                <label className={labelClass}>I am signing up as a</label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select account type</option>
                  <option value="donor">Donor</option>
                  <option value="hospital">Hospital / Facility</option>
                </select>
              </div>

              {/* Donor fields */}
              {userType === "donor" && (
                <>
                  <div className="flex flex-col gap-[8px]">
                    <label className={labelClass}>Full Name <span className="text-[#D43545]">*</span></label>
                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className={labelClass}>Email <span className="text-[#D43545]">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email address" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className={labelClass}>Blood Type <span className="text-[#D43545]">*</span></label>
                    <select name="bloodType" value={form.bloodType} onChange={handleChange} className={inputClass}>
                      <option value="">Select blood type</option>
                      {BLOOD_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
                    </select>
                  </div>

                  <div className="flex gap-[14px]">
                    <div className="flex flex-col gap-[8px] flex-1">
                      <label className={labelClass}>Age</label>
                      <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" min="18" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-[8px] flex-1">
                      <label className={labelClass}>Gender</label>
                      <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className={labelClass}>Location</label>
                    <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Your city or area" className={inputClass} />
                  </div>
                </>
              )}

              {/* Hospital fields */}
              {userType === "hospital" && (
                <>
                  <div className="flex flex-col gap-[8px]">
                    <label className={labelClass}>Facility Name <span className="text-[#D43545]">*</span></label>
                    <input type="text" name="hospitalName" value={form.hospitalName} onChange={handleChange} placeholder="Enter facility name" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className={labelClass}>Contact Number</label>
                    <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Enter contact number" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className={labelClass}>Email <span className="text-[#D43545]">*</span></label>
                    <input type="email" name="hospitalEmail" value={form.hospitalEmail} onChange={handleChange} placeholder="Enter email address" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className={labelClass}>Location</label>
                    <input type="text" name="hospitalLocation" value={form.hospitalLocation} onChange={handleChange} placeholder="Hospital area or address" className={inputClass} />
                  </div>
                </>
              )}

              {/* Password fields — shown once a role is selected */}
              {userType && (
                <div className="flex gap-[14px]">
                  <div className="flex flex-col gap-[8px] flex-1">
                    <label className={labelClass}>Password <span className="text-[#D43545]">*</span></label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-[8px] flex-1">
                    <label className={labelClass}>Confirm Password <span className="text-[#D43545]">*</span></label>
                    <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" className={inputClass} />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[16px] rounded-[10px] py-[14px] mt-[4px] disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>

              <p className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c] text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-[#D43545] font-bold">Log in</Link>
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
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
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
