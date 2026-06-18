
import savesLives from "../assets/saves-lives.jpeg";
import heartbeat from "../assets/heartbeat.png";
import beAHero from "../assets/be-a-hero.jpeg";
import coopBank from "../assets/coop-bank.jpg";
import safaricom from "../assets/safaricom.png";
import amref from "../assets/amref.png";

import { Link, useLocation } from "react-router-dom";



const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Find Donors", path: "/donors" },
  { label: "About Us", path: "/about" },
];

const STEPS = [
    {
        number: "1",
        color: "bg-[#498881]/[0.46]",
        text: "Visit a nearby hospital or clinic and get your blood checked for transfusion",
        wrapperClass: "w-[333px] h-[300px] left-[472px] top-[28px]",
    },
    {
        number: "2",
        color: "bg-[#D43545]/[0.61]",
        text: "We then link these clinics with recipients in various hospitals that need immediate help",
        wrapperClass: "w-[333px] h-[300px] left-[95px] top-[366px]",
    },
    {
        number: "3",
        color: "bg-[#CED26E]/[0.57]",
        text: "Arrangement is then organised for the blood to be collected and then utilised",
        wrapperClass: "w-[333px] h-[300px] left-[837px] top-[366px]",
    },
];

const STATS = [
    {
        value: "1.2 Million",
        label: "Active donors using our system available",
        className: "bg-[#F26D6D] text-white",
    },
    {
        value: "140,000+",
        label: "Donations performed so far",
        className: "bg-[#FFE2E6] text-[#1E2833] border border-[#F26D6D]/40",
    },
    {
        value: "16",
        label: "Hospitals and clinics that use the service",
        className: "bg-[#9BCB6F] text-[#1E2833]",
    },
    {
        value: "370+",
        label: "Blood collection centres",
        className: "bg-[#9FB8C4] text-[#1E2833]",
    },
];

const SPONSORS = [
    { src: safaricom, alt: "Safaricom" },
    { src: coopBank, alt: "Co-op Bank" },
    { src: amref, alt: "Amref Health Africa" },
];

function Header() {
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
function HowWeWork() {
    return (
        <section className="px-[60px] pt-[60px] pb-[40px]">
            <h2 className="font-['Manrope',sans-serif] font-bold text-[36px] text-black mb-[40px]">
                How we work
            </h2>

            <div className="relative w-[1280px] h-[720px] mx-auto">
               
                {STEPS.map((step) => (
                    <div
                        key={step.number}
                        className={`absolute ${step.wrapperClass} ${step.color} rounded-[50%] flex flex-col items-center justify-center text-center px-[40px] shadow-[0px_4px_50px_rgba(0,0,0,0.1)]`}
                    >
                        <span className="font-['Manrope',sans-serif] font-bold text-[64px] text-black drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mb-[10px]">
                            {step.number}
                        </span>
                        <p className="font-['Manrope',sans-serif] text-[18px] text-black leading-normal">
                            {step.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Sponsors() {
    return (
        <section className="px-[60px] py-[60px]">
            <h2 className="font-['Manrope',sans-serif] font-bold text-[40px] text-black mb-[50px]">
                Our Sponsors
            </h2>

            <div className="flex items-center justify-center gap-[180px]">
                {SPONSORS.map((sponsor) => (
                    <div
                        key={sponsor.alt}
                        className="size-[260px] rounded-[15px] border-[1.6px] border-black overflow-hidden flex items-center justify-center bg-white"
                    >
                        <img
                            src={sponsor.src}
                            alt={sponsor.alt}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-[60px] mt-[60px]">
                {[0, 1, 2].map((dot) => (
                    <span key={dot} className="block size-[17px] rounded-full bg-[#B6B5B5]" />
                ))}
            </div>
        </section>
    );
}

function UnderlyingMetrics() {
    return (
        <section>
            <div className="w-full h-[40px] bg-gradient-to-r from-[#9BCB6F] via-[#F4D35E] to-[#F26D6D] flex items-center justify-center">
                <span className="font-['Roboto',sans-serif] font-bold text-[14px] tracking-[2px] uppercase text-white">
                    Underlying metrics
                </span>
            </div>

            <div className="grid grid-cols-4 gap-[24px] px-[60px] py-[40px] bg-white">
                {STATS.map((stat) => (
                    <div
                        key={stat.label}
                        className={`rounded-[10px] p-[24px] ${stat.className}`}
                    >
                        <p className="font-['Roboto',sans-serif] font-bold text-[28px] mb-[8px]">
                            {stat.value}
                        </p>
                        <p className="font-['Roboto',sans-serif] font-light text-[14px] leading-snug">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function MissionVision() {
    return (
        <section className="px-[60px] py-[60px] flex gap-[24px]">
            <div className="flex-1 bg-white rounded-[5px] shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] p-[40px]">
                <h3 className="font-['Roboto',sans-serif] font-bold text-[36px] text-black mb-[24px]">
                    Our Mission
                </h3>
                <p className="font-['Roboto',sans-serif] font-light text-[20px] text-[#3c3c3c] tracking-[1px] leading-relaxed">
                    To connect blood donors with patients in need by providing a
                    reliable, accessible, and efficient platform that makes blood
                    donation easier and helps save lives.
                </p>
            </div>

            <div className="flex-1 bg-white rounded-[5px] shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] p-[40px]">
                <h3 className="font-['Roboto',sans-serif] font-bold text-[36px] text-black mb-[24px]">
                    Our Vision
                </h3>
                <p className="font-['Roboto',sans-serif] font-light text-[20px] text-[#3c3c3c] tracking-[1px] leading-relaxed">
                    To become a trusted digital platform that transforms blood donation
                    management by creating a connected community where every patient
                    can access life-saving blood when needed.
                </p>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-[#1e2833] px-[60px] py-[60px]">
            <div className="flex items-center justify-between pb-[40px] border-b border-white/10">
                <p className="font-['DM_Sans',sans-serif] text-[22px] text-white">
                    Are you an organization?
                </p>
                <button className="bg-white text-black font-['Roboto',sans-serif] font-bold text-[24px] rounded-[8px] px-[40px] py-[12px]">
                    Apply
                </button>
            </div>

            <div className="flex items-start justify-between py-[40px]">
                <img src={beAHero} alt="Be a hero" className="w-[255px] rounded-[8px]" />

                <div className="font-['DM_Sans',sans-serif] text-right">
                    <p className="text-[#ffd2dd] text-[17px] mb-[20px]">Help</p>
                    <p className="text-white text-[15px] mb-[12px]">FAQs</p>
                    <p className="text-white text-[15px]">Contact Us</p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-[40px] border-t border-white/10">
                <div className="flex gap-[40px] font-['DM_Sans',sans-serif] text-[15px] text-white">
                    <a href="#">Terms &amp; Conditions</a>
                    <a href="#">Privacy Policy</a>
                </div>

                <div className="flex gap-[20px] text-white">
                    <a href="#" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-7.03H8.078v-2.85h2.36V9.797c0-2.33 1.42-3.622 3.514-3.622.703 0 1.523.13 1.523.13v2.622h-1.34c-1.32 0-1.733.83-1.733 1.66v1.96h2.948l-.47 2.85h-2.478v7.03C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 2.94 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71-.02-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C2.95 20.29 5.02 21 7.29 21c8.74 0 13.51-7.34 13.51-13.71 0-.21 0-.42-.02-.63A9.4 9.4 0 0 0 23 4.59a8.96 8.96 0 0 1-2.54.7z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default function HomePage() {
    return (
        <div className="bg-[#eeeaea] w-[1440px] mx-auto">
            <Header />
            <HowWeWork />
            <Sponsors />
            <UnderlyingMetrics />
            <MissionVision />
            <Footer />
        </div>
    );
}
