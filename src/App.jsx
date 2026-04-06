import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import './App.css'
import { useState } from "react";
import Insights from "./pages/Insights";

function App() {

  const [role, setRole] = useState("viewer");

  return (
    <DashboardLayout setRole={setRole} role={role}>
      <Routes>
        <Route path="/" element={<Dashboard role={role} />} />
        <Route path="/transactions" element={<Transactions role={role}/>} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;