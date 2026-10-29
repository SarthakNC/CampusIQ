import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Chat from "./pages/Chat";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-panel">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="*"
            element={<div className="not-found">Page not found.</div>}
          />
        </Routes>
      </main>
    </div>
  );
}