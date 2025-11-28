// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from './components/Auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman login */}
        <Route path="/" element={<LoginForm />} />

        {/* Satu komponen Dashboard dipakai di banyak path dengan initialMenuId berbeda */}
        <Route
          path="/dashboard"
          element={<Dashboard initialMenuId="dashboard" />}
        />
        <Route
          path="/data-induk"
          element={<Dashboard initialMenuId="master_data" />}
        />
        <Route
          path="/laporan-kir"
          element={<Dashboard initialMenuId="reports" />}
        />
        <Route
          path="/label"
          element={<Dashboard initialMenuId="print_labels" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
