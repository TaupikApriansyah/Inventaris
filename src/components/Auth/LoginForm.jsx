// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (username.trim() === '' || password.trim() === '') {
      setError('Username dan password wajib diisi');
      return;
    }

    // kalau kamu mau validasi user, bisa di sini
    // contoh dummy: kalau mau pakai rule tertentu:
    // if (username !== 'admin.kecamatan' || password !== '123456') { ... }

    onLogin && onLogin({ username, password });

    // anggap login selalu sukses -> redirect ke dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1a1a4f] flex">
      {/* Bagian kiri */}
      <div className="flex-1 flex flex-col justify-center p-12 text-white max-w-xl">
        <img
          src="/logo-kecamatan.png"
          alt="Logo Kecamatan Bandung Kidul"
          className="h-20 mb-6"
        />
        <h1 className="text-3xl font-extrabold mb-3">KECAMATAN BANDUNG KIDUL</h1>
        <p className="text-sm leading-relaxed opacity-80 mb-8 max-w-md">
          Sistem Informasi Manajemen Barang Daerah Terintegrasi. Platform pengelolaan aset negara yang transparan, akuntabel, dan presisi untuk Kecamatan Bandung Kidul.
        </p>
        <p className="text-xs opacity-50">
          Version 3.5.0 (Enterprise Build) <br />
          © 2025 Pemerintah Kota Bandung
        </p>
      </div>

      {/* Bagian kanan: Form Login */}
      <div className="w-full max-w-md bg-gray-100 p-10 rounded-l-lg shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Selamat Datang</h2>
        <p className="text-sm text-gray-500 mb-7">
          Silakan masuk untuk mengakses dashboard inventaris.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-xs font-medium text-gray-600 mb-1">
              NIP / USERNAME
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
                  <path d="M12 14v7"></path>
                  <path d="M17 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"></path>
                </svg>
              </span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="admin.kecamatan"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">
              PASSWORD SISTEM
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition duration-200"
          >
            MASUK APLIKASI
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
