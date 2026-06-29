import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DonorDirectoryPage from "./pages/donors/DonorDirectoryPage";
import DonorDetailsPage from "./pages/donors/DonorDetailsPage";
import DonorProfilePage from "./pages/donors/DonorProfilePage";
import IncomingRequestsPage from "./pages/donors/IncomingRequestsPage";
import { Toaster } from 'react-hot-toast';
import HospitalProfilePage from "./pages/hospitals/HospitalProfilePage";
import BloodRequestForm from "./pages/requests/BloodRequestForm";
import RequestListPage from "./pages/requests/RequestListPage";
import HospitalDashboard from "./pages/hospitals/HospitalDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route path="/donor/requests" element={<IncomingRequestsPage />} />
        { /* hospital routes*/}
        <Route

          path="/hospital/profile"

          element={

            <ProtectedRoute role="hospital">

              <HospitalProfilePage />

            </ProtectedRoute>

          }

        />
        <Route

          path="/requests"

          element={

            <ProtectedRoute role="hospital">

              <RequestListPage />

            </ProtectedRoute>

          }

        />
        <Route

          path="/requests/create"

          element={

            <ProtectedRoute role="hospital">

              <BloodRequestForm />

            </ProtectedRoute>

          }

        />
        <Route

          path="/hospital/dashboard"

          element={

            <ProtectedRoute role="hospital">

              <HospitalDashboard />

            </ProtectedRoute>

          }

        />
      </Routes>
    </>

  );
}

export default App;