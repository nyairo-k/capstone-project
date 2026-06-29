import { Link, useLocation } from "react-router-dom";
import savesLives from "../assets/saves-lives.jpeg";

const PUBLIC_LINKS = [
  { label: "Home", path: "/" },
  { label: "Find Donors", path: "/donors" },
  { label: "About Us", path: "/about" },
];


const HOSPITAL_LINKS = [
  { label: "Dashboard", path: "/hospital/dashboard" },
  { label: "Profile", path: "/hospital/profile" },
  { label: "Create Request", path: "/requests/create" },
  { label: "Requests", path: "/requests" },
];

const DONOR_LINKS = [
  { label: "Dashboard", path: "/" },
  { label: "Profile", path: "/donor/profile" },
  { label: "Blood Requests", path: "/donor/requests" },
];

export default function Navbar() {

  const location = useLocation();


  const links = role === "hospital"
    ? HOSPITAL_LINKS
    : PUBLIC_LINKS;



  return (
    <header className="flex items-center justify-between px-[60px] py-[24px] bg-[#eeeaea]">

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
            className={`font-['Poppins',sans-serif] text-[22px] pb-[10px]
            ${location.pathname === link.path
                ? "border-b-[5px] border-[#4b4949]"
                : ""
              }`}
          >

            {link.label}

          </Link>

        ))}

      </nav>


      <Link

        to="/login"

        onClick={() => {
          localStorage.removeItem("currentUser");
        }}

        className="bg-[rgba(242,7,11,0.63)] text-white font-bold text-[22px] rounded-[10px] px-[45px] py-[14px]"
      >

        Logout

      </Link>


    </header>
  )
}