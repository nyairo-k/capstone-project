import beAHero from "../assets/be-a-hero.jpeg";

export default function Footer() {
  return (
    <footer className="bg-[#1e2833] px-[60px] py-[60px]">

      <div className="flex items-start justify-between py-[40px]">
        <img src={beAHero} alt="Be a hero" className="w-[255px] rounded-[8px]" />

        <div className="font-['DM_Sans',sans-serif] text-right">
          <p className="text-[#ffd2dd] text-[17px] mb-[20px]">Help</p>
          <p className="text-white text-[15px] mb-[12px]">FAQs</p>
          <p className="text-white text-[15px]">Contact Us</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-[40px] border-t border-white/10">
        <div className="flex gap-[40px] font-['DM_Sans',sans-serif] text-[15px] text-white">
          <p href="#">Terms &amp; Conditions</p>
          <p href="#">Privacy Policy</p>
        </div>


      </div>
    </footer>
  );
}