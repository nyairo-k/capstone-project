const URGENCY_STYLES = {
  critical: "bg-red-100 text-red-700 border border-red-200",
  urgent: "bg-orange-100 text-orange-700 border border-orange-200",
  standard: "bg-green-100 text-green-700 border border-green-200",
};

const STATUS_STYLES = {
  open: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  declined: "bg-gray-100 text-gray-500",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Props:
//   request  — { id, hospital_name, blood_type, units_needed, urgency, location, notes, status, created_at }
//   mode     — "donor" | "hospital"
//   onAccept / onDecline — (id) => void   [donor mode]
//   onEdit / onDelete    — (request) / (id) => void   [hospital mode]
export default function RequestCard({ request, mode, onAccept, onDecline, onEdit, onDelete }) {
  const isDonorMode = mode === "donor";
  const isOpen = request.status === "open";

  return (
    <div className="bg-white rounded-[16px] border border-[#9FB8C4]/30 shadow-[0px_4px_40px_rgba(0,0,0,0.06)] p-[28px] flex flex-col gap-[14px] hover:shadow-[0px_8px_50px_rgba(212,53,69,0.10)] transition-shadow">

      {/* Top row — blood type badge, urgency, status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <span className="bg-[#D43545] text-white font-['Roboto',sans-serif] font-bold text-[15px] px-[12px] py-[5px] rounded-[8px]">
            {request.blood_type}
          </span>
          <span className={`font-['Roboto',sans-serif] text-[12px] font-semibold px-[10px] py-[4px] rounded-[6px] uppercase tracking-wide ${URGENCY_STYLES[request.urgency] ?? ""}`}>
            {request.urgency}
          </span>
        </div>
        <span className={`font-['Roboto',sans-serif] text-[12px] font-semibold px-[10px] py-[4px] rounded-[6px] capitalize ${STATUS_STYLES[request.status] ?? ""}`}>
          {request.status}
        </span>
      </div>

      {/* Hospital name */}
      <p className="font-['Manrope',sans-serif] font-bold text-[17px] text-black leading-tight">
        {request.hospital_name}
      </p>

      {/* Location + units */}
      <div className="flex items-center gap-[24px] flex-wrap">
        <span className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c] flex items-center gap-[5px]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D43545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {request.location}
        </span>
        <span className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">
          {request.units_needed} unit{request.units_needed !== 1 ? "s" : ""} needed
        </span>
      </div>

      {/* Notes */}
      {request.notes && (
        <p className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c] leading-[1.6] border-l-[3px] border-[#D43545]/40 pl-[12px] italic">
          {request.notes}
        </p>
      )}

      {/* Footer — date + action buttons */}
      <div className="flex items-center justify-between pt-[4px] flex-wrap gap-[10px]">
        <span className="font-['Roboto',sans-serif] text-[12px] text-[#9FB8C4]">
          Posted {formatDate(request.created_at)}
        </span>

        <div className="flex gap-[10px]">
          {/* Donor actions — only show when request is open */}
          {isDonorMode && isOpen && (
            <>
              <button
                onClick={() => onAccept(request.id)}
                className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[13px] px-[20px] py-[8px] rounded-[8px]"
              >
                Accept
              </button>
              <button
                onClick={() => onDecline(request.id)}
                className="border border-[#9FB8C4]/60 hover:bg-[#eeeaea] transition-colors text-[#3c3c3c] font-['Roboto',sans-serif] font-bold text-[13px] px-[20px] py-[8px] rounded-[8px]"
              >
                Decline
              </button>
            </>
          )}

          {/* Donor — already responded */}
          {isDonorMode && !isOpen && (
            <span className="font-['Roboto',sans-serif] text-[12px] text-[#9FB8C4] italic">
              {request.status === "accepted" ? "Accepted" : "Closed"}
            </span>
          )}

          {/* Hospital actions */}
          {!isDonorMode && (
            <>
              <button
                onClick={() => onEdit(request)}
                className="border border-[#9FB8C4]/60 hover:bg-[#eeeaea] transition-colors text-[#3c3c3c] font-['Roboto',sans-serif] font-bold text-[13px] px-[20px] py-[8px] rounded-[8px]"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(request.id)}
                className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[13px] px-[20px] py-[8px] rounded-[8px]"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
