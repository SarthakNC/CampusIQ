import { NavLink } from "react-router-dom";
import {
    MessageSquare,
    LayoutDashboard,
    GraduationCap,
    Plus,
    Settings,
} from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-icon">
                    <GraduationCap size={25} />
                </div>
                <div>
                    <h2>CampusIQ</h2>
                    <span>Campus Knowledge AI</span>
                </div>
            </div>

            <NavLink to="/" className="new-chat">
                <Plus size={18} /> New conversation
            </NavLink>

            <p className="sidebar-label">WORKSPACE</p>

            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }
            >
                <MessageSquare size={19} /> Student Chat
            </NavLink>

            <NavLink
                to="/admin"
                className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }
            >
                <LayoutDashboard size={19} /> Admin Dashboard
            </NavLink>

            <div className="sidebar-bottom">
                <div className="sidebar-note">
                    <Settings size={18} />
                    <div>
                        <strong>Campus Assistant</strong>
                        <span>Multilingual support</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
