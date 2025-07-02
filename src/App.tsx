import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/Register";
import { HomePage } from "./pages/Home";
import { CreateOfferPage } from "./pages/CreateOffer";
import { ProfilePage } from "./pages/Profile";
import { EditProfilePage } from "./pages/EditProfile";
import { ResourcesPage } from "./pages/Resources";
import { MyActivitiesPage } from "./pages/MyActivities";
import { MainLayout } from "./components/MainLayout";

function ProtectedRoutes() {
  const token = localStorage.getItem("authToken");
  return token ? <MainLayout /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rotas Protegidas */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/offers/new" element={<CreateOfferPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/users/:userId/profile" element={<ProfilePage />} />
        <Route path="/my-activities" element={<MyActivitiesPage />} />
        <Route path="/resources" element={<ResourcesPage />} />{" "}
      </Route>

      {/* Rota Padrão */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
