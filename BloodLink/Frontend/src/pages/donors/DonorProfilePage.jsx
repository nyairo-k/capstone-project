import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Replace with real logged-in donor id once auth is ready
const LOGGED_IN_DONOR_ID = 5;

export default function DonorProfilePage(){
    const navigate = useNavigate();
    const[donor, setDonor] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[editing, setEditing] = useState(false);
    const[form, setForm] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/donors/${LOGGED_IN_DONOR_ID}`)
        .then((res) => res.json())
        .then((data) => {
            setDonor(data);
            setForm({
                full_name: data.full_name,
                phone_number: data.phone_number || "",
                blood_type: data.blood_type,
                location: data.location || "",
                is_available: data.is_available,
            });
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    const handleChange = (e) => {
        const value = e.target.type ==="checkbox" ? e.target.checked : e.target.value;
        setForm({...form, [e.target.name]: value });
    };
    const handleUpdate = () => {
        fetch(`http://localhost:5000/donors/${LOGGED_IN_DONOR_ID}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(form),
        })
        .then((res) => res.json())
        .then((data) => {
            setDonor(data);
            setEditing(false);
        })
        .catch((err) => console.error(err));

    };

    const handleDelete = () => {
        if(!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

        fetch(`http://localhost:5000/donors/${LOGGED_IN_DONOR_ID}`, {
            method: "DELETE",
        })
        .then(() => navigate("/"))
        .catch((err) => console.error(err));
    };
    if(loading) {
        return(
            <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
                <Navbar />
                <p className="px-[60px] py-[40px] font-['Roboto', sans-serif] text-[18px] text-[#3c3c3c]">
                    Loading profile...
                </p>
                <Footer />
            </div>
        );
    }

    if(error || !donor) {
        return (
            <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
                <Navbar />
                <p className="px-[60px] py-[40px] font-['Roboto',sans-serif] text-[18px] text-[#D43545]">
                    Could not load profile.
                </p>
                <Footer />
            </div>
        );
    }
    return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
      <Navbar />

      <section className="px-[60px] pt-[40px] pb-[80px]">
        <h1 className="font-['Manrope',sans-serif] font-bold text-[40px] text-black mb-[30px]">
          My Profile
        </h1>

        <div className="bg-white rounded-[12px] shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] p-[40px] max-w-[700px]">

          <div className="size-[100px] rounded-full bg-[#D43545]/20 flex items-center justify-center mb-[24px]">
            <span className="font-['Roboto',sans-serif] font-bold text-[40px] text-[#D43545]">
              {donor.full_name.charAt(0)}
            </span>
          </div>

          {!editing ? (
            <div className="space-y-[14px] font-['Roboto',sans-serif] text-[16px] text-black">
              <p><span className="font-bold">Full Name:</span> {donor.full_name}</p>
              <p><span className="font-bold">Email:</span> {donor.email}</p>
              <p><span className="font-bold">Phone Number:</span> {donor.phone_number || "Not provided"}</p>
              <p><span className="font-bold">Blood Type:</span> <span className="text-[#D43545] font-bold">{donor.blood_type}</span></p>
              <p><span className="font-bold">Location:</span> {donor.location || "Not provided"}</p>
              <p>
                <span className="font-bold">Available to Donate:</span>{" "}
                <span className={donor.is_available ? "text-green-600 font-bold" : "text-[#D43545] font-bold"}>
                  {donor.is_available ? "Yes" : "No"}
                </span>
              </p>
              <p><span className="font-bold">Last Donation Date:</span> {donor.last_donation_date || "Not provided"}</p>

              <div className="flex gap-[16px] mt-[30px]">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[16px] rounded-[10px] px-[30px] py-[12px]"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-[#1e2833] hover:bg-[#2d3a47] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[16px] rounded-[10px] px-[30px] py-[12px]"
                >
                  Delete Account
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-[16px] font-['Roboto',sans-serif] text-[16px]">
              <div className="flex flex-col gap-[6px]">
                <label className="font-bold text-[14px] text-[#3c3c3c]">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] focus:outline-none focus:border-[#D43545]"
                />
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="font-bold text-[14px] text-[#3c3c3c]">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  className="px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] focus:outline-none focus:border-[#D43545]"
                />
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="font-bold text-[14px] text-[#3c3c3c]">Blood Type</label>
                <select
                  name="blood_type"
                  value={form.blood_type}
                  onChange={handleChange}
                  className="px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] focus:outline-none focus:border-[#D43545]"
                >
                  {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bt => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="font-bold text-[14px] text-[#3c3c3c]">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="px-[16px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-[#eeeaea] focus:outline-none focus:border-[#D43545]"
                />
              </div>

              <div className="flex items-center gap-[12px]">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={form.is_available}
                  onChange={handleChange}
                  className="size-[18px]"
                />
                <label className="font-['Roboto',sans-serif] text-[16px] text-black">
                  Available to donate
                </label>
              </div>

              <div className="flex gap-[16px] mt-[20px]">
                <button
                  onClick={handleUpdate}
                  className="bg-[rgba(242,7,11,0.63)] hover:bg-[rgba(242,7,11,0.8)] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[16px] rounded-[10px] px-[30px] py-[12px]"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-[#9FB8C4] hover:bg-[#8aa8b5] transition-colors text-white font-['Roboto',sans-serif] font-bold text-[16px] rounded-[10px] px-[30px] py-[12px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
