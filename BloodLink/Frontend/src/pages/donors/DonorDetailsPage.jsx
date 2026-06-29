import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// import savesLives from "../../assets/saves-lives.jpeg";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


export default function DonorDetailsPage() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/donors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDonor(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
        <Navbar role="donor" />
        <p className="px-[60px] py-[40px] font-['Roboto',sans-serif] text-[18px] text-[#3c3c3c]">
          Loading donor details...
        </p>
        <Footer />
      </div>
    );
  }

  if (error || !donor) {
    return (
      <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
        <Navbar role="donor" />
        <p className="px-[60px] py-[40px] font-['Roboto',sans-serif] text-[18px] text-[#D43545]">
          Could not load donor details.
        </p>
        <Footer />
      </div>
    );
  }

  const hasCoordinates = donor.latitude && donor.longitude;

  return (
    <div className="bg-[#eeeaea] w-[1440px] mx-auto min-h-screen">
      <Navbar role="donor" />

      <section className="px-[60px] pt-[40px] pb-[80px]">
        <Link
          to="/donors"
          className="font-['Roboto',sans-serif] text-[16px] text-[#D43545] mb-[24px] inline-block"
        >
          ← Back to Donor Directory
        </Link>

        <div className="flex gap-[24px]">
          {/* Donor Details Panel */}
          <div className="flex-1 bg-white rounded-[12px] shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)] p-[40px]">
            <h2 className="font-['Manrope',sans-serif] font-bold text-[28px] text-[#D43545] mb-[24px]">
              Donor Details
            </h2>

            <div className="space-y-[14px] font-['Roboto',sans-serif] text-[16px] text-black">
              <p>
                <span className="font-bold">Full Name:</span>{" "}
                {donor.full_name}
              </p>
              <p>
                <span className="font-bold">Blood Group:</span>{" "}
                <span className="text-[#D43545] font-bold">{donor.blood_type}</span>
              </p>
              <p>
                <span className="font-bold">Phone Number:</span> {donor.phone_number}
              </p>
              <p>
                <span className="font-bold">Address/Location:</span>{" "}
                {donor.location}
              </p>
              <p>
                <span className="font-bold">Available:</span>{" "}
                <span className={donor.is_available ? "text-green-600 font-bold" : "text-[#D43545] font-bold"}>
                  {donor.is_available ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <span className="font-bold">Last Donation Date:</span>{" "}
                {donor.last_donation_date || "Not provided"}
              </p>
              <p>
                <span className="font-bold">Registered:</span>{" "}
                {new Date(donor.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 rounded-[12px] overflow-hidden shadow-[0px_4px_100px_3px_rgba(220,220,220,0.25)]">
            {hasCoordinates ? (
            <MapContainer
              center={[donor.latitude, donor.longitude]}
              zoom={12}
              style={{ height: "100%", minHeight: "360px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[donor.latitude, donor.longitude]}>
                <Popup>
                  {donor.full_name} - {donor.blood_type}
                </Popup>
              </Marker>
            </MapContainer>
            ) : (
              <div className="h-full min-h-[360px] bg-white flex items-center justify-center">
                <p className="font-['Roboto', sans-serif] text-[16px] text-[#3c3c3c]">
                  Location not available for this donor.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Policy / Contact box */}
        <div className="bg-[#9BCB6F]/20 border border-[#9BCB6F] rounded-[12px] p-[24px] mt-[24px] text-center">
          <h3 className="font-['Roboto',sans-serif] font-bold text-[18px] text-black mb-[8px]">
            Policy Questions
          </h3>
          <p className="font-['Roboto',sans-serif] text-[15px] text-[#3c3c3c] mb-[4px]">
            You can contact us at +254 700 000 012
          </p>
          <p className="font-['Roboto',sans-serif] text-[15px] text-[#3c3c3c]">
            You can also email us at the link below
          </p>
          <Link to="/about" className="font-['Roboto',sans-serif] text-[15px] text-[#D43545] underline">
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}