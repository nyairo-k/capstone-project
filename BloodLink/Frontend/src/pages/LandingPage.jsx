import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
    const stats = [
        { value: "250+", label: "Registered Donors", icon: "❤" },
        { value: "40+", label: "Partner Hospitals", icon: "🏥" },
        { value: "120+", label: "Blood Requests", icon: "🩸" },
        { value: "98%", label: "Successful Matches", icon: "✓" }
    ];

    const workflow = [
        { step: "1", title: "Hospital creates request", text: "Hospitals submit urgent blood requirements into the platform." },
        { step: "2", title: "Donors receive request", text: "Compatible donors receive alert notifications instantly." },
        { step: "3", title: "Donor accepts donation", text: "Donors confirm availability and accept the pending request." },
        { step: "4", title: "Hospital receives alert", text: "Hospitals get notified immediately to coordinate the intake." }
    ];

    const features = [
        { title: "Emergency Blood Requests", text: "Hospitals can create urgent requests that become instantly visible to compatible donors." },
        { title: "Donor Management", text: "Donors maintain their medical profile, availability and blood type." },
        { title: "Secure Authentication", text: "JWT-based authentication protects sensitive hospital and donor information." },
        { title: "Request Tracking", text: "Monitor every request from creation until completion." }
    ];

    return (
        <div className="bg-[#EEEEEA] min-h-screen w-full text-[#1B1B1B] font-sans selection:bg-[#D43545] selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="px-[60px] py-[80px] max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <p className="text-[#D43545] tracking-[4px] font-extrabold text-sm uppercase">
                        Donate Blood. Save Lives.
                    </p>

                    <h1 className="text-6xl font-black uppercase leading-tight tracking-tight">
                        Donate Blood.<br />
                        <span className="text-[#D43545]">Save Lives Today</span>
                    </h1>
                    <p className="text-[#6B7280] text-xl leading-relaxed max-w-[500px]">
                        BloodLink connects verified donors with hospitals during emergencies, making blood donation faster, safer and more accessible.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Link to="/login" className="bg-[#D43545] hover:bg-[#b82a38] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-200">
                            Become a Donor
                        </Link>
                        <Link to="/login" className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-200">
                            Hospital Portal
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-white rounded-[40px] p-8 h-[450px] shadow-sm border border-gray-100">
                    <div className="text-center space-y-4">
                        <div className="text-[120px] leading-none animate-pulse">🩸</div>
                        <p className="text-gray-400 text-sm font-medium tracking-wider uppercase">Blood Donation Connection Network</p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="bg-white border-y border-gray-200 shadow-sm">
                <div className="max-w-[1440px] mx-auto px-[60px] py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center md:border-r last:border-0 border-gray-200 py-4">
                            <span className="text-2xl mb-2 block">{stat.icon}</span>
                            <h2 className="text-4xl font-black text-[#1B1B1B]">{stat.value}</h2>
                            <p className="text-[#6B7280] mt-1 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="px-[60px] py-[100px] max-w-[1440px] mx-auto text-center">
                <p className="text-[#D43545] tracking-[3px] font-bold text-xs uppercase mb-3">Workflow</p>
                <h2 className="text-4xl font-black mb-16">How BloodLink Works</h2>
                <div className="grid md:grid-cols-4 gap-8 relative">
                    {workflow.map((flow, i) => (
                        <div key={i} className="bg-white p-8 rounded-[30px] shadow-sm relative group hover:shadow-md transition-all duration-200">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#D43545] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                                {flow.step}
                            </div>
                            <h4 className="font-bold text-xl mt-4 mb-3">{flow.title}</h4>
                            <p className="text-[#6B7280] text-sm leading-relaxed">{flow.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why BloodLink Section */}
            <section className="bg-[#F8F9FA] px-[60px] py-[100px] border-y border-gray-200">
                <div className="max-w-[1440px] mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[#D43545] tracking-[3px] font-bold text-xs uppercase mb-3">Core Value</p>
                        <h2 className="text-4xl font-black">Why Choose BloodLink?</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feat, i) => (
                            <div key={i} className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between">
                                <div>
                                    <div className="text-3xl text-[#D43545] mb-4">✓</div>
                                    <h3 className="font-bold text-xl mb-3">{feat.title}</h3>
                                    <p className="text-[#6B7280] text-sm leading-relaxed">{feat.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Can Use BloodLink Section */}
            <section className="px-[60px] py-[100px] max-w-[1440px] mx-auto">
                <div className="text-center mb-16">
                    <p className="text-[#D43545] tracking-[3px] font-bold text-xs uppercase mb-3">Target Users</p>
                    <h2 className="text-4xl font-black">Who Can Use BloodLink?</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
                    {/* Donors Card */}
                    <div className="bg-white p-10 rounded-[35px] shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-black text-[#D43545] mb-6 flex items-center gap-2">
                            <span>🩸</span> For Donors
                        </h3>
                        <ul className="space-y-4 text-[#6B7280]">
                            <li className="flex items-center gap-3 font-medium">
                                <span className="text-[#D43545]">•</span> Create donor account securely
                            </li>
                            <li className="flex items-center gap-3 font-medium">
                                <span className="text-[#D43545]">•</span> Manage operational health profile
                            </li>
                            <li className="flex items-center gap-3 font-medium">
                                <span className="text-[#D43545]">•</span> Accept local emergency requests
                            </li>
                            <li className="flex items-center gap-3 font-medium">
                                <span className="text-[#D43545]">•</span> Instantly update real-time availability
                            </li>
                        </ul>
                    </div>
                    {/* Hospital Card */}
                    <div className="bg-white p-10 rounded-[35px] shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-black text-black mb-6 flex items-center gap-2">
                            <span>🏥</span> For Hospitals
                        </h3>
                        <ul className="space-y-4 text-[#6B7280]">
                            <li className="flex items-center gap-3 font-medium">
                                <span className="text-black">•</span> Register verified medical facility
                            </li>
                            <li className="flex items-center gap-3 font-medium">
                                <span className="text-black">•</span> Create emergency blood requests
                            </li>
                            <li className="flex items-center gap-3 font-medium">
                                <span className="text-black">•</span> Track real-time response pipelines
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-white px-[60px] py-[80px] text-center border-t border-gray-200">
                <div className="max-w-[800px] mx-auto space-y-6">
                    <p className="text-[#D43545] tracking-[3px] font-bold text-xs uppercase">About Us</p>
                    <h2 className="text-3xl font-black">Bridging the Communication Gap</h2>
                    <p className="text-[#6B7280] text-lg leading-relaxed">
                        BloodLink was developed to bridge the communication gap between blood donors and hospitals by providing a centralized platform for emergency blood requests, secure donor management and efficient response tracking.
                    </p>
                </div>
            </section>

            {/* Call To Action */}
            <section className="px-[60px] py-[100px] bg-gradient-to-br from-black via-[#1B1B1B] to-gray-900 text-white text-center relative overflow-hidden">
                <div className="absolute right-[-50px] bottom-[-50px] text-[300px] leading-none text-white/5 pointer-events-none font-black">
                    🩸
                </div>
                <div className="max-w-[700px] mx-auto space-y-8 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Every Donation Can Save Three Lives
                    </h2>
                    <p className="text-gray-400 text-xl font-medium">
                        Join BloodLink today. Start making a difference.
                    </p>
                    <div className="pt-4">
                        <Link to="/signup" className="bg-[#D43545] hover:bg-[#b82a38] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl inline-block transition-all duration-200">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}