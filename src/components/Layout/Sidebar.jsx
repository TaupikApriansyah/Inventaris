  import React from 'react';

  const MENU_ITEMS = [
    { label: "Dashboard", icon: (
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zM13 21h8v-6h-8v6zm0-8h8v-6h-8v6zM3 21h8v-6H3v6z" />
      </svg>
    ), id: 'dashboard' },
    { label: "Input Barang (KIB)", icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 7v4a1 1 0 001 1h3m10-5.5v-1a2 2 0 112 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7m5 4h2m-2 4h2" />
      </svg>
    ), id: 'master_data' },
    // { label: "Input Ruangan (KIR)", icon: (
    //   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    //     <path d="M3 7v4a1 1 0 001 1h3m10-5.5v-1a2 2 0 112 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7m5 4h2m-2 4h2" />
    //   </svg>
    // ), id: 'input_kir' },
    { label: "Laporan & KIR", icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 17v-2a2 2 0 012-2h6M13 7h6v6M5 7h6v6H5z" />
      </svg>
    ), id: 'reports' },
    { label: "Cetak Label Aset", icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 12v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8m7-4h4v4h-4z" />
      </svg>
    ), id: 'print_labels' },
    { label: "Konfigurasi", icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4M12 4a8 8 0 110 16 8 8 0 010-16zM20 12c0-1.38-1.12-2.5-2.5-2.5S15 10.62 15 12s1.12 2.5 2.5 2.5S20 13.38 20 12z" />
      </svg>
    ), id: 'configuration' },
  ];

  const Sidebar = ({ activeMenuId, onMenuItemClick, onLogout }) => {
    return (
      <div className="bg-[#12154c] text-white w-56 h-screen flex flex-col justify-between py-6 px-4 shadow-xl select-none relative">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <img src="/logo-bdg-kidul.png" alt="Logo SIMBADA" className="h-10 w-auto" />
            <div>
              <h1 className="font-extrabold text-lg tracking-wide">SIMBADA</h1>
              <p className="text-xs opacity-80">BANDUNG KIDUL</p>
            </div>
          </div>

          <p className="opacity-60 font-semibold mb-1 text-sm">MENU UTAMA</p>

          {/* Menu Items */}
          <nav className="flex flex-col space-y-2">
            {MENU_ITEMS.map(item => {
              const isActive = item.id === activeMenuId;
              return (
                <button
                  key={item.id}
                  onClick={() => onMenuItemClick(item.id)}
                  className={`flex items-center text-sm font-semibold px-3 py-2 rounded-lg transition-colors duration-200
                    ${isActive ? 'bg-[#0a35ff] text-white' : 'text-white hover:bg-[#1d2789]'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center text-gray-300 hover:text-red-400 hover:bg-[#1d2789] rounded-md px-3 py-2 transition-colors duration-200 font-semibold text-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Keluar Sistem
        </button>
      </div>
    );
  };

  export default Sidebar;