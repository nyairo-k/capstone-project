import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RequestCard from "../../components/RequestCard";

// TODO: Update to your Flask server address
const API_BASE = "http://localhost:5000";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const inputClass =
  "px-[14px] py-[10px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545] w-full";
const labelClass = "font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]";

const STATUS_TABS = ["All", "Open", "Accepted", "Declined"];

export default function RequestsPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [editingRequest, setEditingRequest] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    // TODO: Confirm endpoint path with backend team
    // Expected: GET /requests?hospital_id=<id>
    // Returns all requests posted by this hospital
    fetch(`${API_BASE}/requests?hospital_id=${currentUser.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load requests");
        return res.json();
      })
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentUser.id]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request? This cannot be undone.")) return;

    // TODO: Confirm endpoint path with backend team
    // Expected: DELETE /requests/<id>
    const res = await fetch(`${API_BASE}/requests/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("Failed to delete request.");
    }
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
    setEditForm({
      blood_type: request.blood_type,
      units_needed: request.units_needed,
      urgency: request.urgency,
      location: request.location,
      notes: request.notes || "",
    });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();

    // TODO: Confirm endpoint path with backend team
    // Expected: PATCH /requests/<id>
    // Body: any subset of { blood_type, units_needed, urgency, location, notes }
    const res = await fetch(`${API_BASE}/requests/${editingRequest.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editForm, units_needed: parseInt(editForm.units_needed) }),
    });

    if (res.ok) {
      const updated = await res.json();
      setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      setEditingRequest(null);
    } else {
      alert("Failed to update request.");
    }
  };

  const displayed =
    activeTab === "All"
      ? requests
      : requests.filter((r) => r.status === activeTab.toLowerCase());

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
      <Navbar />

      <section className="px-[60px] pt-[40px] pb-[80px]">

        {/* Header */}
        <div className="flex items-center justify-between mb-[32px]">
          <div>
            <h1 className="font-['Manrope',sans-serif] font-bold text-[36px] text-black">
              My Blood Requests
            </h1>
            <p className="font-['Roboto',sans-serif] text-[14px] text-[#9FB8C4] mt-[4px]">
              {requests.length} request{requests.length !== 1 ? "s" : ""} posted
            </p>
          </div>
          <Link
            to="/hospital/create-request"
            className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[15px] rounded-[10px] px-[28px] py-[13px]"
          >
            + New Request
          </Link>
        </div>

        {/* Loading / error */}
        {loading && (
          <p className="font-['Roboto',sans-serif] text-[16px] text-[#3c3c3c]">
            Loading requests...
          </p>
        )}
        {error && (
          <p className="font-['Roboto',sans-serif] text-[16px] text-[#D43545]">
            {error}
          </p>
        )}

        {/* Inline edit form */}
        {editingRequest && (
          <div className="bg-white rounded-[16px] border border-[#D43545]/30 shadow-[0px_4px_40px_rgba(212,53,69,0.10)] p-[32px] mb-[32px]">
            <h2 className="font-['Manrope',sans-serif] font-bold text-[20px] text-black mb-[24px]">
              Edit Request
            </h2>
            <form onSubmit={handleEditSave} className="flex flex-col gap-[16px]">
              <div className="flex gap-[16px]">
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className={labelClass}>Blood Type</label>
                  <select
                    value={editForm.blood_type}
                    onChange={(e) => setEditForm({ ...editForm, blood_type: e.target.value })}
                    className={inputClass}
                  >
                    {BLOOD_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className={labelClass}>Urgency</label>
                  <select
                    value={editForm.urgency}
                    onChange={(e) => setEditForm({ ...editForm, urgency: e.target.value })}
                    className={inputClass}
                  >
                    <option value="critical">Critical — Immediate</option>
                    <option value="urgent">Urgent — Within 24 hrs</option>
                    <option value="standard">Standard — Scheduled</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px] w-[120px]">
                  <label className={labelClass}>Units Needed</label>
                  <input
                    type="number"
                    min="1"
                    value={editForm.units_needed}
                    onChange={(e) => setEditForm({ ...editForm, units_needed: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <label className={labelClass}>Notes</label>
                <textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="flex gap-[12px]">
                <button
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="border border-[#9FB8C4]/60 hover:bg-[#eeeaea] transition-colors text-[#3c3c3c] font-['Roboto',sans-serif] font-bold text-[14px] rounded-[10px] px-[24px] py-[10px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[14px] rounded-[10px] px-[24px] py-[10px]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Status filter tabs */}
        {!loading && !error && (
          <div className="flex gap-[4px] mb-[28px] bg-white rounded-[12px] p-[6px] w-fit shadow-[0px_2px_20px_rgba(0,0,0,0.04)]">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-['Roboto',sans-serif] text-[14px] font-semibold px-[20px] py-[8px] rounded-[8px] transition-colors ${
                  activeTab === tab
                    ? "bg-[#D43545] text-white"
                    : "text-[#3c3c3c] hover:bg-[#eeeaea]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && displayed.length === 0 && (
          <div className="flex flex-col items-center justify-center py-[80px] text-center">
            <p className="font-['Manrope',sans-serif] font-bold text-[20px] text-[#3c3c3c] mb-[8px]">
              No {activeTab !== "All" ? activeTab.toLowerCase() : ""} requests yet
            </p>
            <p className="font-['Roboto',sans-serif] text-[14px] text-[#9FB8C4] mb-[24px]">
              Post your first blood request to connect with available donors.
            </p>
            <Link
              to="/hospital/create-request"
              className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[15px] rounded-[10px] px-[28px] py-[13px]"
            >
              + Post a Request
            </Link>
          </div>
        )}

        {/* Request cards */}
        {!loading && !error && displayed.length > 0 && (
          <div className="grid grid-cols-2 gap-[24px]">
            {displayed.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                mode="hospital"
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
