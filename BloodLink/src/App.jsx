import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DonorDirectoryPage from "./pages/donors/DonorDirectoryPage";
import DonorDetailsPage from "./pages/donors/DonorDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/donors" element={<DonorDirectoryPage />} />
      <Route path="/donors/:id" element={<DonorDetailsPage />} />
    </Routes>
  );
}

export default App;