
import savesLives from "../assets/saves-lives.jpeg";
import heartbeat from "../assets/heartbeat.png";
import beAHero from "../assets/be-a-hero.jpeg";
import coopBank from "../assets/coop-bank.jpg";
import safaricom from "../assets/safaricom.png";
import amref from "../assets/amref.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Link, useLocation } from "react-router-dom";



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
    return (
        <Navbar />
    )

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


export default function HomePage() {
    return (
        <div className="bg-[#eeeaea] min-h-screen w-full">
            <Header />
            <HowWeWork />
            <Sponsors />
            <UnderlyingMetrics />
            <MissionVision />
            <Footer />
        </div>
    );
}
