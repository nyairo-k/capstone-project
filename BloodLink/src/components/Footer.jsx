import beAHero from "../assets/be-a-hero.jpeg";

export default function Footer() {
  return (
    <footer className="bg-[#1e2833] px-[60px] py-[60px]">
      <div className="flex items-center justify-between pb-[40px] border-b border-white/10">
        <p className="font-['DM_Sans',sans-serif] text-[22px] text-white">
          Are you an organization?
        </p>
        <button className="bg-white text-black font-['Roboto',sans-serif] font-bold text-[24px] rounded-[8px] px-[40px] py-[12px]">
          Apply
        </button>
      </div>

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
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="flex gap-[20px] text-white">
          <a href="#" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-7.03H8.078v-2.85h2.36V9.797c0-2.33 1.42-3.622 3.514-3.622.703 0 1.523.13 1.523.13v2.622h-1.34c-1.32 0-1.733.83-1.733 1.66v1.96h2.948l-.47 2.85h-2.478v7.03C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 2.94 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71-.02-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C2.95 20.29 5.02 21 7.29 21c8.74 0 13.51-7.34 13.51-13.71 0-.21 0-.42-.02-.63A9.4 9.4 0 0 0 23 4.59a8.96 8.96 0 0 1-2.54.7z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}