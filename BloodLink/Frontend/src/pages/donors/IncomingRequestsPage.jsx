import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const LOGGED_IN_DONOR_ID = 5;

export default function IncomingRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/requests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleRespond = (requestId, response) => {
    fetch(`http://localhost:5000/requests/${requestId}/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        response,
        donor_id: LOGGED_IN_DONOR_ID,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setRequests((prev) =>
          prev.map((r) => (r.id === updated.id ? updated : r))
        );
      })
      .catch((err) => console.error(err));
  };

  const urgencyColor = (level) => {
    switch (level) {
      case "critical": return "text-[#D43545] font-bold";
      case "high": return "text-orange-500 font-bold";
      case "medium": return "text-yellow-600 font-bold";
      default: return "text-green-600 font-bold";
    }
  };

  if (loading) {
    return (
      <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
        <Navbar role="donor"/>
        <p className="px-[60px] py-[40px] font-['Roboto',sans-serif] text-[18px] text-[#3c3c3c]">
          Loading requests...
        </p>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
        <Navbar role="donor"/>
        <p className="px-[60px] py-[40px] font-['Roboto',sans-serif] text-[18px] text-[#D43545]">
          Error: {error}
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
      <Navbar role="donor" />

      <section className="px-[60px] pt-[40px] pb-[80px]">
        <h1 className="font-['Manrope',sans-serif] font-bold text-[40px] text-black mb-[30px]">
          Incoming Blood Requests
        </h1>

        {requests.length === 0 && (
          <p className="font-['Roboto',sans-serif] text-[18px] text-[#3c3c3c]">
            No blood requests available at the moment.
          </p>
        )}

        <div className="grid grid-cols-2 gap-[24px]">
          {requests.map((req) => (
            <div 
              key={req.id}
              className="bg-white rounded-[12px] shadow-[0px_4px_40px_rgba(0,0,0,0.05)] p-[30px]"
            >
              <div className="flex items-center justify-between mb-[16px]">
                <span className="font-['Manrope',sans-serif] font-bold text-[24px] text-[#D43545]">
                  {req.blood_type_needed}
                </span>
                <span className={`font-['Roboto',sans-serif] text-[14px] capitalize ${urgencyColor(req.urgency_level)}`}>
                  {req.urgency_level} urgency
                </span>
             </div>

              <div className="space-y-[10px] font-['Roboto',sans-serif] text-[15px] text-[#3c3c3c] mb-[20px]">
                <p><span className="font-bold text-black">Hospital:</span> {req.hospital_name}</p>
                <p><span className="font-bold text-black">Units Needed:</span> {req.units_needed}</p>
                <p><span className="font-bold text-black">Location:</span> {req.location}</p>
                <p><span className="font-bold text-black">Contact:</span> {req.contact_phone}</p>
                <p>
                  <span className="font-bold text-black">Status:</span>{" "}
                  <span className="capitalize">{req.status}</span>
                </p>
              </div>

              {req.status === "pending" && (
                <div className="flex gap-[12px]">
                  <button
                    onClick={() => handleRespond(req.id, "accepted")}
                    className="flex-1 bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[15px] rounded-[10px] py-[10px]"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRespond(req.id, "declined")}
                    className="flex-1 bg-[#9FB8C4] hover:bg-[#8aa8b5] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[15px] rounded-[10px] py-[10px]"
                  >
                    Decline
                  </button>
                </div>
              )}

              {req.status !== "pending" && (
                <p className="font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c] capitalize">
                  You have <span className="font-bold">{req.status}</span> this request.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}