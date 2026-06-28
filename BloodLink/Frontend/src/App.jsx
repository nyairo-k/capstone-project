import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DonorDirectoryPage from "./pages/donors/DonorDirectoryPage";
import DonorDetailsPage from "./pages/donors/DonorDetailsPage";
import DonorProfilePage from "./pages/donor/DonorProfilePage";
import HospitalProfilePage from "./pages/hospital/HospitalProfilePage";
import HospitalRequestsPage from "./pages/hospital/HospitalRequestsPage";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />

    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/donors" element={<DonorDirectoryPage />} />
      <Route path="/donors/:id" element={<DonorDetailsPage />} />

      <Route path="/donor/profile" element={<DonorProfilePage />} />
      <Route path="/hospital/profile" element={<HospitalProfilePage />} />
      <Route path="/hospital/requests" element={<HospitalRequestsPage />} />
    </Routes>
    </>

  );
}

export default App;