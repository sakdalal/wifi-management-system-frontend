import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Isp SaaS</h2>

      <nav>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/complaints"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Complaints
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Customers
        </NavLink>
        <NavLink
          to="/payments"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Payments
        </NavLink>
        <NavLink
          to="/plans"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Plans
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Settings
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Subscriptions
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
