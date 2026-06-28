import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// TODO: Update to your Flask server address
const API_BASE = "http://localhost:5000";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const inputClass =
  "px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545] w-full";
const labelClass = "font-['Roboto',sans-serif] text-[14px] text-[#3c3c3c]";

export default function CreateRequestPage() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [form, setForm] = useState({
    blood_type: "",
    units_needed: "",
    urgency: "",
    location: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.blood_type || !form.units_needed || !form.urgency || !form.location) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      // TODO: Confirm endpoint path with backend team
      // Expected: POST /requests
      // Body    : { blood_type, units_needed, urgency, location, notes }
      // hospital_id should be inferred from the auth token on the backend
      const res = await fetch(`${API_BASE}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blood_type: form.blood_type,
          units_needed: parseInt(form.units_needed),
          urgency: form.urgency,
          location: form.location,
          notes: form.notes,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Failed to post request. Please try again.");
        return;
      }

      navigate("/hospital/requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
      <Navbar />

      <section className="flex justify-center py-[60px] px-[60px]">
        <div className="bg-white rounded-[24px] shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] p-[48px] w-full max-w-[620px]">

          <h1 className="font-['Manrope',sans-serif] font-bold text-[28px] text-black mb-[6px]">
            Post a Blood Request
          </h1>
          <p className="font-['Roboto',sans-serif] text-[14px] text-[#9FB8C4] mb-[36px]">
            Donors will be notified and can accept or decline your request.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">

            {/* Blood Type + Urgency */}
            <div className="flex gap-[16px]">
              <div className="flex flex-col gap-[8px] flex-1">
                <label className={labelClass}>Blood Type <span className="text-[#D43545]">*</span></label>
                <select name="blood_type" value={form.blood_type} onChange={handleChange} className={inputClass}>
                  <option value="">Select blood type</option>
                  {BLOOD_TYPES.map((bt) => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-[8px] flex-1">
                <label className={labelClass}>Urgency Level <span className="text-[#D43545]">*</span></label>
                <select name="urgency" value={form.urgency} onChange={handleChange} className={inputClass}>
                  <option value="">Select urgency</option>
                  <option value="critical">Critical — Immediate</option>
                  <option value="urgent">Urgent — Within 24 hrs</option>
                  <option value="standard">Standard — Scheduled</option>
                </select>
              </div>
            </div>

            {/* Units Needed */}
            <div className="flex flex-col gap-[8px]">
              <label className={labelClass}>Units Needed <span className="text-[#D43545]">*</span></label>
              <input
                type="number"
                name="units_needed"
                value={form.units_needed}
                onChange={handleChange}
                placeholder="e.g. 2"
                min="1"
                className={inputClass}
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-[8px]">
              <label className={labelClass}>Location <span className="text-[#D43545]">*</span></label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Hospital name and area, e.g. Mulago Hill, Kampala"
                className={inputClass}
              />
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-[8px]">
              <label className={labelClass}>Additional Notes <span className="font-['Roboto',sans-serif] text-[12px] text-[#9FB8C4]">(optional)</span></label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any additional context about the patient or situation..."
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-[14px] mt-[8px]">
              <button
                type="button"
                onClick={() => navigate("/hospital/requests")}
                className="flex-1 border border-[#9FB8C4]/60 hover:bg-[#eeeaea] transition-colors text-[#3c3c3c] font-['Roboto',sans-serif] font-bold text-[15px] rounded-[10px] py-[13px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[15px] rounded-[10px] py-[13px] disabled:opacity-60"
              >
                {loading ? "Posting..." : "Post Request"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
