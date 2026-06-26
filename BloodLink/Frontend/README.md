BloodLink — Frontend Progress Notes

What this is

A React + Vite frontend for a blood donation platform (BloodLink), converted
from a Figma export into working, maintainable components: a Home page and
an About page, sharing one visual style (cream background #eeeaea, red
accent rgba(242,7,11,0.63), sage/olive/blue-gray supporting colors).

Tech stack


React 19 + Vite (dev server, hot reload)
Tailwind CSS v4 via @tailwindcss/vite (utility-first styling)
react-router-dom v7 for routing (BrowserRouter in main.jsx)
lucide-react for icons (Heart, ShieldCheck, Users, MapPin, etc. —
note: brand/social icons like Facebook/Twitter/Instagram were removed from
recent lucide-react versions, so those are hand-coded inline SVGs)
react-hot-toast for toast notifications


What was done


Rebuilt the Figma-exported HomePage from hundreds of absolute-positioned
elements into normal stacked sections (Header, How We Work, Sponsors,
Underlying Metrics, Mission/Vision, Footer) at a fixed 1440px desktop
width.
Fixed broken asset import paths (images live in src/assets/, pages in
src/pages/ — so imports use ../assets/...).
Installed and configured Tailwind v4, fixed global spacing/margin reset in
index.css.
Wrapped <App /> in <BrowserRouter> (in main.jsx) and moved
<Toaster /> outside of <Routes> so routing works correctly.
Made the navbar use <Link> + useLocation() so links actually navigate
and the active tab highlights automatically.
Added a hover effect on the logo.
Turned "Our Sponsors" into a horizontal scroll carousel with prev/next
arrow buttons and clickable dot indicators.
Built AboutPage.jsx as a single component (Hero, Story, Mission/Vision,
Values grid, CTA, Footer) reusing the same color palette and nav/header.


How to run it

bashcd BloodLink
npm install
npm run dev

Then open the local URL shown in the terminal (e.g. http://localhost:5173).