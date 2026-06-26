import { Link } from "react-router-dom";

export default function DonorCard({ donor }) {
  return (
    <Link to={`/donors/${donor.id}`}
      className="bg-[#FFE2E6] border border-[#F26D6D]/30 rounded-[12px] p-[20px] flex flex-col items-center text-center shadow-[0px_4px_40px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_50px_rgba(212,53,69,0.15)] transition-shadow"
    >
      <img src={donor.image}
        alt={`${donor.firstName} ${donor.lastName}`}
        className="size-[64px] rounded-full object-cover mb-[12px]"
      />
      <p className="font-['Roboto',sans-serif] font-bold text-[16px] text-black">
        {donor.firstName} {donor.lastName}
      </p>
      <span className="font-['Roboto',sans-serif] text-[14px] text-[#D43545] font-bold mt-[6px]">
        Blood Group: {donor.bloodGroup}
      </span>
    </Link>
  );
}