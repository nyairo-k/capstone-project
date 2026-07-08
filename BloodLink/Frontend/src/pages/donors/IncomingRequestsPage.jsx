import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api/api";

export default function IncomingRequestsPage() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/requests")
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch requests");
        setLoading(false);
      });
  }, []);

  const handleRespond = async (requestId, response) => {
    try {
      const result = await api.patch(
        `/requests/${requestId}`,
        {
          status: response,
        }
      );

      setRequests((prev) =>
        prev.map((r) =>
          r.id === result.data.request.id
            ? result.data.request
            : r
        )
      );
    }
    catch (error) {
      console.log(error);
    }
  };

  const urgencyColor = (level) => {
    switch (level) {
      case "critical":
        return "text-[#D43545] font-bold";
      case "high":
        return "text-orange-500 font-bold";
      case "medium":
        return "text-yellow-600 font-bold";
      default:
        return "text-green-600 font-bold";
    }
  };

  if (loading) {
    return (
      <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
        <Navbar role="donor" />
        <p className="px-[60px] py-[40px]">
          Loading requests...
        </p>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
        <Navbar role="donor" />
        <p className="px-[60px] py-[40px] text-[#D43545]">
          {error}
        </p>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
      <Navbar role="donor" />
      <section className="px-[60px] pt-[40px] pb-[80px]">
        <h1 className="font-['Manrope',sans-serif] font-bold text-[40px] text-black mb-[30px]">
          Incoming Blood Requests
        </h1>

        {requests.length === 0 &&
          <p className="font-['Roboto',sans-serif] text-[18px]">
            No blood requests available at the moment.
          </p>
        }

        <div className="grid grid-cols-2 gap-[24px]">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-[12px] shadow-[0px_4px_40px_rgba(0,0,0,0.05)] p-[30px]"
            >
              <div className="flex justify-between mb-[16px]">
                <span className="font-bold text-[24px] text-[#D43545]">
                  {req.blood_type_needed}
                </span>
                <span className={urgencyColor(req.urgency_level)}>
                  {req.urgency_level} urgency
                </span>
              </div>

              <div className="space-y-[10px] mb-[20px]">
                <p><b>Hospital:</b> {req.hospital_name}</p>
                <p><b>Units Needed:</b> {req.units_needed}</p>
                <p><b>Location:</b> {req.location}</p>
                <p><b>Contact:</b> {req.contact_phone}</p>
                <p><b>Status:</b> {req.status}</p>
              </div>

              {req.status === "pending" &&
                <div className="flex gap-[12px]">
                  <button
                    onClick={() => handleRespond(req.id, "accepted")}
                    className="flex-1 bg-[#D43545] text-white rounded-[10px] py-[10px]"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRespond(req.id, "declined")}
                    className="flex-1 bg-[#9FB8C4] text-white rounded-[10px] py-[10px]"
                  >
                    Decline
                  </button>
                </div>
              }

              {req.status !== "pending" &&
                <p>This Request was  <b>{req.status}</b></p>
              }
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}