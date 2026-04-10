import React from "react";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const DashboardLayout = ({ children, role, setRole }) => {

  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const formatTitle = (path) => {
    const map = {
      "/": "Dashboard",
      "/transactions": "Transactions",
      "/insights": "Insights",
    };
    return map[path] || "Dashboard";
  };

  return (
    <div className="flex min-h-screen bg-main layout">

      {/* Sidebar */}
      <aside className="w-64 bg-card shadow-md hidden md:block">
        <div className="p-5 text-center ">
          <span className="text-xl font-bold text-center text-primary pe-1">Zorvyn</span>
          <span className="text-secondary">Fintech</span>
        </div>

        <nav className="p-4 space-y-2">

          <NavLink
            to="/"
            className={`text-xl block cursor-pointer ${location.pathname === "/" ? "text-accent" : "text-secondary"
              } hover:text-accent`}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={`text-xl block cursor-pointer ${location.pathname === "/transactions" ? "text-primary" : "text-secondary"
              } hover:text-primary`}
          >
            Transactions
          </NavLink>

          <NavLink
            to="/insights"
            className={`text-xl block cursor-pointer ${location.pathname === "/insights" ? "text-primary" : "text-secondary"
              } hover:text-accent`}
          >
            Insights
          </NavLink>

        </nav>
      </aside>

      {menuOpen && (
        <div className="sidemenu fixed inset-0 z-50 flex">

          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-64 bg-card shadow-md p-5 z-50">

            <div className="flex justify-between items-center mb-4">
              <div>

                <span className="text-xl font-bold text-primary pe-1">
                  Zorvyn
                </span>
                <span className="text-secondary">Fintech</span>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-primary text-lg"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-3">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block text-secondary hover:text-accent"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/transactions"
                onClick={() => setMenuOpen(false)}
                className="block text-secondary hover:text-accent"
              >
                Transactions
              </NavLink>

              <NavLink
                to="/insights"
                onClick={() => setMenuOpen(false)}
                className="block text-secondary hover:text-accent"
              >
                Insights
              </NavLink>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="bg-card shadow px-2 sm:px-6 py-2 sm:py-4 flex justify-between items-center">


          <div className="text-lg font-semibold text-primary capitalize">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-primary text-xl pe-2"
            >
              ☰
            </button>
            {formatTitle(location.pathname) || "Dashboard"}
            <span className="ml-2 text-sm text-secondary">
              ({role})
            </span>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-7 flex items-center rounded-full p-1 transition duration-300 
                ${darkMode ? "bg-slate-700" : "bg-yellow-400"}
              `}
            >
              {/* Icon */}


              {/* Toggle Knob */}
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300
                  ${darkMode ? "translate-x-7" : "translate-x-0"}
                `}
              />
            </button>

            <div className="relative w-fit mr-2">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="custom-select small"
              >

                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>

              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                ▼
              </span>
            </div>

          </div>
        </header>

        {/* Content */}
        <main className="main-container p-2 sm:p-6 space-y-6">
          {React.cloneElement(children, { role })}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;