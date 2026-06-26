import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DonorDirectoryPage from "./pages/donors/DonorDirectoryPage";
import DonorDetailsPage from "./pages/donors/DonorDetailsPage";
import { Toaster } from 'react-hot-toast';
import HospitalProfilePage from "./pages/hospitals/HospitalProfilePage";
import BloodRequestForm from "./pages/requests/BloodRequestForm";
import RequestListPage from "./pages/requests/RequestListPage";
import HospitalDashboard from "./pages/hospitals/HospitalDashboard";
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
        <Route path="/hospital/profile/:id" element={<HospitalProfilePage />} />
        <Route path="/requests" element={<RequestListPage />} />
        <Route path="/requests/create" element={<BloodRequestForm />} />
        <Route path="hospital/dashboard" element={<HospitalDashboard />} />
      </Routes>
    </>

  );
}

export default App;