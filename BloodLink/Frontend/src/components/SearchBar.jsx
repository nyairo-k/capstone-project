export default function SearchBar({value, onChange}){
    return(
        <input 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search donors by name or blood group..."
        className="w-full max-w-[480px] px-[20px] py-[12px] rounded-[10px] border border-[#9FB8C4]/50 bg-white font-['Roboto',sans-serif] text-[16px] text-black focus:outline-none focus:border-[#D43545]"
        />
    );
}