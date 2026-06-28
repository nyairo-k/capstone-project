import { Link } from "react-router-dom";

export default function DonorCard({ donor }) {
  return (
    <Link to={`/donors/${donor.id}`}
      className="bg-[#FFE2E6] border border-[#F26D6D]/30 rounded-[12px] p-[20px] flex flex-col items-center text-center shadow-[0px_4px_40px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_50px_rgba(212,53,69,0.15)] transition-shadow"
    >
      <div className="size-[64px] rounded-full bg-[#D43545]/20 flex items-center justify-center mb-[12px]">
      <span className="font- ['Roboto', sans-serif] font-bold text-[24px] text-[#D43545]">
        {donor.full_name.charAt(0)}
      </span>
      </div>
      <p className="font-['Roboto', sans-serif] font-bold text-[16px] text-black">
        {donor.full_name}
      </p>
      <span className="font-['Roboto', sans-serif] text-[14px] text-[#D43545] font-bold mt-[6px]">
        Blood Group: {donor.blood_type}
      </span>
      <span className="font-['Roboto', sans-serif] text-[13px] text-[#3c3c3c] mt-[4px]">
        {donor.location}
      </span>
    </Link>
  );
}  