import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const API_BASE = "http://localhost:5000"; // TODO: update for production

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const STATUS_TABS = ["All", "Pending", "Accepted", "Rejected"];

const URGENCY_STYLES = {
  critical: "bg-red-100 text-red-700",
  urgent: "bg-orange-100 text-orange-700",
  standard: "bg-green-100 text-green-700",
};

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-gray-100 text-gray-500",
};

const inputClass =
  "px-[14px] py-[10px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] font-['Roboto',sans-serif] text-[14px] focus:outline-none focus:border-[#D43545] w-full";
const labelClass =
  "font-['Roboto',sans-serif] text-[13px] text-[#9FB8C4] uppercase tracking-wide";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function HospitalRequestsPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [createForm, setCreateForm] = useState({
    blood_type_needed: "",
    units_needed: "",
    urgency_level: "",
    contact_phone: "",
    location: "",
  });

  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (!currentUser.id) {
      setError("Not logged in. Please log in as a hospital.");
      setLoading(false);
      return;
    }

    // GET /requests?hospital_id=<id> — returns only this hospital's requests
    fetch(`${API_BASE}/requests?hospital_id=${currentUser.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load requests");
        return res.json();
      })
      .then(setRequests)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentUser.id]);

  const handleCreateChange = (e) => {
    setCreateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.blood_type_needed || !createForm.units_needed || !createForm.urgency_level) {
      alert("Blood type, units needed, and urgency are required.");
      return;
    }
    setSubmitting(true);
    try {
      // POST /requests
      const res = await fetch(`${API_BASE}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requester_name: currentUser.name,
          hospital_name: currentUser.name,
          hospital_id: currentUser.id,              // FK — links this request to the hospital account
          blood_type_needed: createForm.blood_type_needed,
          units_needed: parseInt(createForm.units_needed),
          urgency_level: createForm.urgency_level,
          contact_phone: createForm.contact_phone || null,
          location: createForm.location || null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create request");
      }
      const data = await res.json();
      setRequests((prev) => [data.request, ...prev]);
      setCreateForm({
        blood_type_needed: "",
        units_needed: "",
        urgency_level: "",
        contact_phone: "",
        location: "",
      });
      setShowCreateForm(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditStart = (req) => {
    setEditingId(req.id);
    setEditForm({
      blood_type_needed: req.blood_type_needed,
      units_needed: req.units_needed,
      urgency_level: req.urgency_level,
      contact_phone: req.contact_phone || "",
      location: req.location || "",
    });
  };

  const handleEditSave = async (id) => {
    setSubmitting(true);
    try {
      // PATCH /requests/<id>
      const res = await fetch(`${API_BASE}/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blood_type_needed: editForm.blood_type_needed,
          units_needed: parseInt(editForm.units_needed),
          urgency_level: editForm.urgency_level,
          contact_phone: editForm.contact_phone || null,
          location: editForm.location || null,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...data.request } : r))
      );
      setEditingId(null);
    } catch {
      alert("Failed to update request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request? This cannot be undone.")) return;
    // DELETE /requests/<id>
    const res = await fetch(`${API_BASE}/requests/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("Failed to delete request.");
    }
  };

  const displayed =
    activeTab === "All"
      ? requests
      : requests.filter((r) => r.status === activeTab.toLowerCase());

  const counts = {
    All: requests.length,
    Pending: requests.filter((r) => r.status === "pending").length,
    Accepted: requests.filter((r) => r.status === "accepted").length,
    Rejected: requests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
      <Navbar />

      <section className="px-[60px] pt-[40px] pb-[80px]">

        {/* Page header */}
        <div className="flex items-center justify-between mb-[32px]">
          <div>
            <h1 className="font-['Manrope',sans-serif] font-bold text-[36px] text-black">
              My Blood Requests
            </h1>
            <p className="font-['Roboto',sans-serif] text-[14px] text-[#9FB8C4] mt-[4px]">
              {requests.length} request{requests.length !== 1 ? "s" : ""} posted
            </p>
          </div>
          <button
            onClick={() => { setShowCreateForm(!showCreateForm); setEditingId(null); }}
            className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[15px] rounded-[10px] px-[28px] py-[13px]"
          >
            {showCreateForm ? "Cancel" : "+ Post New Request"}
          </button>
        </div>

        {/* Create request form */}
        {showCreateForm && (
          <div className="bg-white rounded-[24px] shadow-[0px_4px_40px_rgba(0,0,0,0.06)] p-[40px] mb-[32px]">
            <h2 className="font-['Manrope',sans-serif] font-bold text-[22px] text-black mb-[24px]">
              Post a Blood Request
            </h2>
            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-[16px]">
              <div className="flex gap-[16px]">
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className={labelClass}>
                    Blood Type <span className="text-[#D43545]">*</span>
                  </label>
                  <select
                    name="blood_type_needed"
                    value={createForm.blood_type_needed}
                    onChange={handleCreateChange}
                    className={inputClass}
                  >
                    <option value="">Select blood type</option>
                    {BLOOD_TYPES.map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className={labelClass}>
                    Urgency Level <span className="text-[#D43545]">*</span>
                  </label>
                  <select
                    name="urgency_level"
                    value={createForm.urgency_level}
                    onChange={handleCreateChange}
                    className={inputClass}
                  >
                    <option value="">Select urgency</option>
                    <option value="critical">Critical — Immediate</option>
                    <option value="urgent">Urgent — Within 24 hrs</option>
                    <option value="standard">Standard — Scheduled</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px] w-[150px]">
                  <label className={labelClass}>
                    Units Needed <span className="text-[#D43545]">*</span>
                  </label>
                  <input
                    type="number"
                    name="units_needed"
                    min="1"
                    value={createForm.units_needed}
                    onChange={handleCreateChange}
                    placeholder="e.g. 2"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex gap-[16px]">
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className={labelClass}>Location</label>
                  <input
                    name="location"
                    value={createForm.location}
                    onChange={handleCreateChange}
                    placeholder="e.g. Mulago Hill, Kampala"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className={labelClass}>Contact Phone</label>
                  <input
                    name="contact_phone"
                    value={createForm.contact_phone}
                    onChange={handleCreateChange}
                    placeholder="+256 700 000 000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex gap-[12px] mt-[4px]">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="border border-[#9FB8C4]/60 hover:bg-[#eeeaea] transition-colors text-[#3c3c3c] font-['Roboto',sans-serif] font-bold text-[14px] rounded-[10px] px-[24px] py-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[14px] rounded-[10px] px-[24px] py-[11px] disabled:opacity-60"
                >
                  {submitting ? "Posting..." : "Post Request"}
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
                {tab} ({counts[tab]})
              </button>
            ))}
          </div>
        )}

        {/* Loading / error states */}
        {loading && (
          <p className="font-['Roboto',sans-serif] text-[16px] text-[#3c3c3c]">
            Loading requests...
          </p>
        )}
        {error && (
          <p className="font-['Roboto',sans-serif] text-[16px] text-[#D43545]">{error}</p>
        )}

        {/* Empty state */}
        {!loading && !error && displayed.length === 0 && (
          <div className="flex flex-col items-center justify-center py-[80px]">
            <p className="font-['Manrope',sans-serif] font-bold text-[20px] text-[#3c3c3c] mb-[8px]">
              No {activeTab !== "All" ? activeTab.toLowerCase() : ""} requests yet
            </p>
            <p className="font-['Roboto',sans-serif] text-[14px] text-[#9FB8C4] mb-[24px]">
              Post a blood request to connect with available donors.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[15px] rounded-[10px] px-[28px] py-[13px]"
            >
              + Post a Request
            </button>
          </div>
        )}

        {/* Request cards grid */}
        {!loading && !error && displayed.length > 0 && (
          <div className="grid grid-cols-2 gap-[24px]">
            {displayed.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-[16px] border border-[#9FB8C4]/30 shadow-[0px_4px_40px_rgba(0,0,0,0.06)] p-[28px] flex flex-col gap-[14px] hover:shadow-[0px_8px_50px_rgba(212,53,69,0.08)] transition-shadow"
              >
                {editingId === req.id ? (
                  /* Inline edit form */
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="font-['Manrope',sans-serif] font-bold text-[16px] text-black">
                      Edit Request
                    </h3>
                    <div className="flex gap-[8px]">
                      <select
                        value={editForm.blood_type_needed}
                        onChange={(e) => setEditForm((p) => ({ ...p, blood_type_needed: e.target.value }))}
                        className={inputClass}
                      >
                        {BLOOD_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
                      </select>
                      <select
                        value={editForm.urgency_level}
                        onChange={(e) => setEditForm((p) => ({ ...p, urgency_level: e.target.value }))}
                        className={inputClass}
                      >
                        <option value="critical">Critical</option>
                        <option value="urgent">Urgent</option>
                        <option value="standard">Standard</option>
                      </select>
                      <input
                        type="number"
                        min="1"
                        value={editForm.units_needed}
                        onChange={(e) => setEditForm((p) => ({ ...p, units_needed: e.target.value }))}
                        className={`${inputClass} w-[80px] flex-shrink-0`}
                      />
                    </div>
                    <input
                      value={editForm.location}
                      onChange={(e) => setEditForm((p) => ({ ...p, location: e.target.value }))}
                      placeholder="Location"
                      className={inputClass}
                    />
                    <input
                      value={editForm.contact_phone}
                      onChange={(e) => setEditForm((p) => ({ ...p, contact_phone: e.target.value }))}
                      placeholder="Contact phone"
                      className={inputClass}
                    />
                    <div className="flex gap-[8px]">
                      <button
                        onClick={() => setEditingId(null)}
                        className="border border-[#9FB8C4]/60 hover:bg-[#eeeaea] text-[#3c3c3c] font-['Roboto',sans-serif] font-bold text-[13px] px-[16px] py-[8px] rounded-[8px] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleEditSave(req.id)}
                        disabled={submitting}
                        className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] text-white font-['Roboto',sans-serif] font-bold text-[13px] px-[16px] py-[8px] rounded-[8px] transition-colors disabled:opacity-60"
                      >
                        {submitting ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Request display */
                  <>
                    {/* Top row: blood type badge, urgency badge, status badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <span className="bg-[#D43545] text-white font-['Roboto',sans-serif] font-bold text-[14px] px-[10px] py-[4px] rounded-[6px]">
                          {req.blood_type_needed}
                        </span>
                        <span className={`font-['Roboto',sans-serif] text-[12px] font-semibold px-[10px] py-[4px] rounded-[6px] capitalize ${URGENCY_STYLES[req.urgency_level] || ""}`}>
                          {req.urgency_level}
                        </span>
                      </div>
                      <span className={`font-['Roboto',sans-serif] text-[12px] font-semibold px-[10px] py-[4px] rounded-[6px] capitalize ${STATUS_STYLES[req.status] || ""}`}>
                        {req.status}
                      </span>
                    </div>

                    {/* Units */}
                    <p className="font-['Roboto',sans-serif] font-semibold text-[15px] text-black">
                      {req.units_needed} unit{req.units_needed !== 1 ? "s" : ""} needed
                    </p>

                    {/* Location + contact */}
                    <div className="flex flex-col gap-[6px]">
                      {req.location && (
                        <p className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">
                          📍 {req.location}
                        </p>
                      )}
                      {req.contact_phone && (
                        <p className="font-['Roboto',sans-serif] text-[13px] text-[#3c3c3c]">
                          📞 {req.contact_phone}
                        </p>
                      )}
                    </div>

                    {/* Donor accepted indicator */}
                    {req.donor_id && (
                      <p className="font-['Roboto',sans-serif] text-[13px] text-green-700 font-semibold bg-green-50 px-[12px] py-[8px] rounded-[8px]">
                        ✓ A donor has accepted this request
                      </p>
                    )}

                    {/* Footer: date + actions */}
                    <div className="flex items-center justify-between pt-[4px] border-t border-[#9FB8C4]/20">
                      <span className="font-['Roboto',sans-serif] text-[12px] text-[#9FB8C4]">
                        Posted {formatDate(req.created_at)}
                      </span>
                      {/* Only allow edit/delete on pending requests */}
                      {req.status === "pending" && (
                        <div className="flex gap-[8px]">
                          <button
                            onClick={() => handleEditStart(req)}
                            className="border border-[#9FB8C4]/60 hover:bg-[#eeeaea] text-[#3c3c3c] font-['Roboto',sans-serif] font-bold text-[13px] px-[16px] py-[7px] rounded-[8px] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(req.id)}
                            className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] text-white font-['Roboto',sans-serif] font-bold text-[13px] px-[16px] py-[7px] rounded-[8px] transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
