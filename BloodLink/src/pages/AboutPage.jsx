import { Link, useLocation } from "react-router-dom";
import { Heart, ShieldCheck, Users, MapPin } from "lucide-react";

import savesLives from "../assets/saves-lives.jpeg";
import beAHero from "../assets/be-a-hero.jpeg";

export default function AboutPage() {
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Find Donors", path: "/donors" },
    { label: "About Us", path: "/about" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      desc: "Every donation is someone's lifeline. We treat every donor and recipient with care and dignity.",
      color: "bg-[#D43545]/[0.12] text-[#D43545]",
    },
    {
      icon: ShieldCheck,
      title: "Trust & Safety",
      desc: "All blood is screened and handled by licensed hospitals and clinics in our network.",
      color: "bg-[#498881]/[0.15] text-[#498881]",
    },
    {
      icon: Users,
      title: "Community",
      desc: "We're built on a growing network of donors, hospitals, and partners working together.",
      color: "bg-[#CED26E]/[0.25] text-[#9a9d3f]",
    },
    {
      icon: MapPin,
      title: "Accessibility",
      desc: "Find a donation point near you, wherever you are, whenever you're ready to help.",
      color: "bg-[#9FB8C4]/[0.3] text-[#5a7884]",
    },
  ];

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-[60px] py-[24px] bg-[#eeeaea]">
        <img
          src={savesLives}
          alt="Blood Donation - Saves Lives"
          className="h-[90px] w-auto rounded-[8px] transition-transform duration-200 hover:scale-105 cursor-pointer"
        />

        <nav className="flex items-center gap-[80px]">
          {navLinks.map((link) => (
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

      {/* Hero */}
      <section className="px-[60px] pt-[60px] pb-[80px] text-center">
        <span className="inline-block font-['Roboto',sans-serif] font-bold text-[14px] tracking-[3px] uppercase text-[#D43545] mb-[16px]">
          About BloodLink
        </span>
        <h1 className="font-['Manrope',sans-serif] font-extrabold text-[56px] text-black leading-tight mb-[24px]">
          Connecting donors with the <br />
          people who need them most
        </h1>
        <p className="font-['Roboto',sans-serif] font-light text-[20px] text-[#3c3c3c] tracking-[0.5px] max-w-[760px] mx-auto leading-relaxed">
          BloodLink makes it simple to find, give, and receive blood when it
          matters most — connecting hospitals, clinics, and everyday heroes
          on one platform.
        </p>
      </section>

      {/* Story */}
      <section className="px-[60px] pb-[80px] flex items-center gap-[60px]">
        <div className="flex-1">
          <h2 className="font-['Manrope',sans-serif] font-bold text-[36px] text-black mb-[24px]">
            Our Story
          </h2>
          <p className="font-['Roboto',sans-serif] font-light text-[18px] text-[#3c3c3c] tracking-[0.5px] leading-relaxed mb-[20px]">
            Every two seconds, someone somewhere needs blood — but matching
            willing donors with the right hospital, at the right time, is
            still a manual, disconnected process for too many communities.
          </p>
          <p className="font-['Roboto',sans-serif] font-light text-[18px] text-[#3c3c3c] tracking-[0.5px] leading-relaxed">
            BloodLink was built to close that gap: a single platform where
            donors can find nearby clinics, hospitals can reach recipients
            faster, and partners can support the network that keeps it all
            running.
          </p>
        </div>

        <div className="flex-1 relative h-[360px] rounded-[20px] overflow-hidden shadow-[0px_4px_60px_rgba(212,53,69,0.25)]">
          <img src={beAHero} alt="Be a hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[rgba(242,7,11,0.15)]" />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-[60px] py-[60px] flex gap-[24px]">
        <div className="flex-1 bg-white rounded-[12px] shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] p-[40px] border-t-[6px] border-[#D43545]">
          <h3 className="font-['Roboto',sans-serif] font-bold text-[32px] text-black mb-[16px]">
            Our Mission
          </h3>
          <p className="font-['Roboto',sans-serif] font-light text-[18px] text-[#3c3c3c] tracking-[0.5px] leading-relaxed">
            To connect blood donors with patients in need by providing a
            reliable, accessible, and efficient platform that makes blood
            donation easier and helps save lives.
          </p>
        </div>

        <div className="flex-1 bg-white rounded-[12px] shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] p-[40px] border-t-[6px] border-[#498881]">
          <h3 className="font-['Roboto',sans-serif] font-bold text-[32px] text-black mb-[16px]">
            Our Vision
          </h3>
          <p className="font-['Roboto',sans-serif] font-light text-[18px] text-[#3c3c3c] tracking-[0.5px] leading-relaxed">
            To become a trusted digital platform that transforms blood
            donation management by creating a connected community where every
            patient can access life-saving blood when needed.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="px-[60px] py-[60px]">
        <h2 className="font-['Manrope',sans-serif] font-bold text-[36px] text-black mb-[50px] text-center">
          What we stand for
        </h2>

        <div className="grid grid-cols-4 gap-[24px]">
          {values.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="bg-white rounded-[16px] p-[32px] shadow-[0px_4px_40px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_50px_rgba(212,53,69,0.15)] transition-shadow"
            >
              <div className={`size-[56px] rounded-[14px] flex items-center justify-center mb-[20px] ${color}`}>
                <Icon size={28} />
              </div>
              <h3 className="font-['Roboto',sans-serif] font-bold text-[20px] text-black mb-[10px]">
                {title}
              </h3>
              <p className="font-['Roboto',sans-serif] font-light text-[15px] text-[#3c3c3c] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[60px] py-[20px] pb-[80px]">
        <div className="bg-[rgba(242,7,11,0.63)] rounded-[20px] px-[60px] py-[60px] flex items-center justify-between">
          <div>
            <h2 className="font-['Manrope',sans-serif] font-bold text-[36px] text-white mb-[10px]">
              Ready to be someone's hero?
            </h2>
            <p className="font-['Roboto',sans-serif] font-light text-[18px] text-white/90">
              Join thousands of donors already saving lives through BloodLink.
            </p>
          </div>
          <Link
            to="/"
            className="bg-white text-[#D43545] font-['Roboto',sans-serif] font-bold text-[22px] rounded-[10px] px-[48px] py-[18px] hover:bg-[#fff5f5] transition-colors whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e2833] px-[60px] py-[40px]">
        <p className="font-['DM_Sans',sans-serif] text-[15px] text-white/60 text-center">
          © {new Date().getFullYear()} BloodLink. All rights reserved.
        </p>
      </footer>
    </div>
  );
}