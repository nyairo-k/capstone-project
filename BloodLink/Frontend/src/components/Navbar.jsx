import { Link, useLocation } from "react-router-dom";
import savesLives from "../assets/saves-lives.jpeg";


const PUBLIC_LINKS = [
  { label: "Home", path: "/" },
  { label: "Find Donors", path: "/donors" },
  { label: "About Us", path: "/about" },
];

const DONOR_LINKS = [
  { label: "Home", path: "/" },
  { label: "Find Donors", path: "/donors" },
  { label: "My Profile", path: "/donor/profile" },
  { label: "Blood Requests", path: "/donor/requests" },
];

const HOSPITAL_LINKS = [
  { label: "Dashboard", path: "/hospital/dashboard" },
  { label: "Profile", path: "/hospital/profile/1" },
  { label: "Create Request", path: "/requests/create" },
  { label: "Requests", path: "/requests" },
];



export default function Navbar({ role = "public" }) {


  const location = useLocation();


  const links = role === "hospital"
    ? HOSPITAL_LINKS
    : role === "donor"
    ? DONOR_LINKS
    : PUBLIC_LINKS;



  return (

    <header className="flex items-center justify-between px-[60px] py-[24px] bg-[#eeeaea]">


      <img

        src={savesLives}

        alt="Blood Donation - Saves Lives"

        className="h-[90px] w-auto rounded-[8px] transition-transform duration-200 hover:scale-105 cursor-pointer"

      />



      <nav className="flex items-center gap-[60px]">


        {

          links.map((link) => (


            <Link

              key={link.label}

              to={link.path}

              className={`font-['Poppins',sans-serif] text-[22px] text-black pb-[10px]

${location.pathname === link.path
                  ? "border-b-[5px] border-[#4b4949]"
                  : ""}

`}

            >


              {link.label}


            </Link>


          ))


        }


      </nav>




      <Link

        to="/login"

        className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] text-[22px] rounded-[10px] px-[45px] py-[14px]"

      >

        Logout

      </Link>



    </header>

  )


}