import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import savesLives from "../assets/saves-lives.jpeg";

const PUBLIC_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
];

const HOSPITAL_LINKS = [
  { label: "Dashboard", path: "/hospital/dashboard" },
  { label: "Profile", path: "/hospital/profile" },
  { label: "Create Request", path: "/requests/create" },
  { label: "Requests", path: "/requests" },
  { label: "About Us", path: "/about" },
];

const DONOR_LINKS = [
  { label: "Dashboard", path: "/donor/dashboard" },
  { label: "Profile", path: "/donor/profile" },
  { label: "Blood Requests", path: "/donor/requests" },
  { label: "About Us", path: "/about" },
];

export default function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const role = user?.role;

  let links = PUBLIC_LINKS;

  if (role === "hospital") {
    links = HOSPITAL_LINKS;
  }

  if (role === "donor") {
    links = DONOR_LINKS;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-[60px] py-[24px] bg-[#eeeaea] transition-shadow duration-300
      ${scrolled ? "shadow-[0px_4px_20px_rgba(0,0,0,0.08)]" : ""}`}
    >

      <img
        src={savesLives}
        alt="Blood Donation"
        className="h-[90px] w-auto rounded-[8px]"
      />

      <nav className="flex items-center gap-[60px]">

        {links.map((link) => (

          <Link
            key={link.label}
            to={link.path}
            className={`font-['Poppins',sans-serif] text-[22px] pb-[10px] transition-colors duration-200 hover:text-[#F2070B]
            ${location.pathname === link.path
                ? "border-b-[5px] border-[#4b4949]"
                : ""
              }`}
          >
            {link.label}
          </Link>

        ))}

      </nav>

      {token ? (

        <button
          onClick={handleLogout}
          className="bg-[rgba(242,7,11,0.63)] text-white hover:-translate-y-0.5 font-bold text-[22px] rounded-[10px] px-[45px] py-[14px]"
        >
          Logout
        </button>

      ) : (
        <div className="flex gap-10">

          <Link
            to="/login"
            className="bg-[rgba(242,7,11,0.63)] text-white hover:-translate-y-0.5 font-bold text-[22px] rounded-[10px] px-[45px] py-[14px]"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-[rgba(242,7,11,0.63)] text-white hover:-translate-y-0.5 font-bold text-[22px] rounded-[10px] px-[45px] py-[14px]"
          >
            Sign Up
          </Link>

        </div>




      )}

    </header>
  );
}