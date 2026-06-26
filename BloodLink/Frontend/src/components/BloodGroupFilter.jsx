const BLOOD_GROUPS = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BloodGroupFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-[20px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-white font-['Roboto',sans-serif] text-[16px] text-black focus:outline-none focus:border-[#D43545]"
    >
      {BLOOD_GROUPS.map((bg) => (
        <option key={bg} value={bg}>
          {bg === "All" ? "All Blood Groups" : bg}
        </option>
      ))}
    </select>
  );
}