import { Link, useLocation } from "react-router-dom";
import savesLives from "../assets/saves-lives.jpeg";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Find Donors", path: "/donors" },
  { label: "About Us", path: "/about" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between px-[60px] py-[24px] bg-[#eeeaea]">
      <img
        src={savesLives}
        alt="Blood Donation - Saves Lives"
        className="h-[90px] w-auto rounded-[8px] transition-transform duration-200 hover:scale-105 cursor-pointer"
      />

      <nav className="flex items-center gap-[80px]">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            className={`font-['Poppins',sans-serif] text-[24px] text-black pb-[10px] ${
              location.pathname === link.path ? "border-b-[5px] border-[#4b4949]" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] text-[25px] rounded-[10px] px-[50px] py-[16px]">
        Logout
      </button>
    </header>
  );
}