import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Navigate } from "react-router-dom";

function DonorProfilePage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  const id = user.id;
  const [donor, setDonor] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    api.get(`/donors/${id}`)
      .then((response) => {
        setDonor(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to load donor profile");
      });
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await api.patch(
        `/donors/${id}`,
        formData
      );

      setDonor(response.data.donor || response.data);
      setEditing(false);
      toast.success("Donor profile updated successfully");
    }
    catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  if (!donor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f3f3]">
        Loading...
      </div>
    )
  }

  return (
    <div className="bg-[#eeeaea] min-h-screen w-full">
      <Navbar />
      <main className="px-[60px] py-[70px]">
        <section className="mb-14">
          <p className="text-[#e63946] tracking-[5px] font-bold">
            BLOODLINK DONOR PORTAL
          </p>
          <h1 className="text-5xl font-extrabold mt-5">
            {donor.full_name}
          </h1>
          <p className="text-gray-600 mt-4">
            Manage your donor information and availability.
          </p>
        </section>

        <section className="bg-white rounded-[35px] p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Donor Information
            </h2>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-[#ef5961] text-white px-8 py-3 rounded-full"
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InputBox
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              editing={editing}
              onChange={handleChange}
            />
            <InputBox
              label="Email"
              name="email"
              value={formData.email}
              editing={editing}
              onChange={handleChange}
            />
            <InputBox
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              editing={editing}
              onChange={handleChange}
            />
            <InputBox
              label="Location"
              name="location"
              value={formData.location}
              editing={editing}
              onChange={handleChange}
            />
            <InputBox
              label="Blood Type"
              name="blood_type"
              value={formData.blood_type}
              editing={editing}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6 bg-[#fafafa] p-6 rounded-2xl">
            <p className="text-gray-500 mb-3">
              Availability
            </p>
            {editing ?
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available || false}
                  onChange={handleChange}
                />
                Available for donation
              </label>
              :
              <h3 className="font-bold text-xl">
                {donor.is_available ? "Available" : "Not Available"}
              </h3>
            }
          </div>

          {editing && (
            <button
              onClick={handleUpdate}
              className="mt-10 bg-black text-white px-10 py-4 rounded-full"
            >
              Save Changes
            </button>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

function InputBox({ label, name, value, editing, onChange }) {
  return (
    <div className="bg-[#fafafa] p-6 rounded-2xl">
      <p className="text-gray-500 mb-3">
        {label}
      </p>
      {editing ?
        <input
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full bg-white border rounded-xl p-3 outline-none"
        />
        :
        <h3 className="font-bold text-xl">
          {value || "Not provided"}
        </h3>
      }
    </div>
  )
}

export default DonorProfilePage;