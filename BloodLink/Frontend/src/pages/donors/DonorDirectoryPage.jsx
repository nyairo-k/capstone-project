import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BloodGroupFilter from "../../components/BloodGroupFilter";
import DonorCard from "../../components/DonorCard";


export default function DonorDirectoryPage() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/donors")
      .then((res) => res.json())
      .then((data) => {
        setDonors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredDonors = donors.filter((donor) => {
    const fullName = donor.full_name.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase());
    const matchesBloodGroup = bloodGroup === "All" || donor.blood_type === bloodGroup;
    return matchesSearch && matchesBloodGroup;
  });

  return (
    <div className="bg-[#eeeaea] min-h-screen w-full">
      <Navbar />

      <section className="px-[60px] pt-[40px] pb-[80px]">
        <h1 className="font-['Manrope',sans-serif] font-bold text-[40px] text-black mb-[30px]">
          Donor Directory
        </h1>

        <div className="flex items-center gap-[20px] mb-[40px]">
          <SearchBar value={search} onChange={setSearch} />
          <BloodGroupFilter value={bloodGroup} onChange={setBloodGroup} />
        </div>

        {loading && (
          <p className="font-['Roboto',sans-serif] text-[18px] text-[#3c3c3c]">
            Loading donors...
          </p>
        )}

        {error && (
          <p className="font-['Roboto',sans-serif] text-[18px] text-[#D43545]">
            Error: {error}
          </p>
        )}

        {!loading && !error && filteredDonors.length === 0 && (
          <p className="font-['Roboto',sans-serif] text-[18px] text-[#3c3c3c]">
            No donors found matching your search.
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-3 gap-[24px]">
            {filteredDonors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}