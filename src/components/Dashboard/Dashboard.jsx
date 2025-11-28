// src/components/Dashboard/Dashboard.jsx
import React, { useState } from 'react';

import { MENU_ITEMS, BG_COLOR, PRIMARY_COLOR, MODES } from '../constants';

import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import DashboardContent from './DashboardContent';
import DataIndukContent from '../DataInduk/DataIndukContent';
import LaporanKIRContent from './LaporanKIRContent';
import PrintLabelsContent from './PrintLabelsContent';

// Data awal digabung (contoh KIB + KIR)
const initialDataItems = [
  // Contoh KIB A
  {
    id: 1,
    jenis: 'KIB',
    sub_jenis: 'Tanah',
    kib_type: 'A',
    kode: '1.01.01.01.001',
    nama: 'Tanah Kantor Utama',
    noreg: '001/T',
    merk: '-',
    lokasi: 'Jl. Sudirman No. 12',
    jumlah: 1,
    satuan: 'Bidang',
    nilai: 'Rp 900.000.000',
    nilaiNumerik: 900000000,
    tahun: 2018,
    asal_usul: 'Pembelian',
    kondisi: 'Baik',
    kategori_abc: 'A',
  },
  // Contoh KIB B
  {
    id: 2,
    jenis: 'KIB',
    sub_jenis: 'Mesin',
    kib_type: 'B',
    kode: '1.03.01.02.001',
    nama: 'Mobil Dinas Sedan',
    noreg: '001/A',
    merk: 'Toyota Camry',
    lokasi: 'Kantor Utama',
    jumlah: 1,
    satuan: 'Unit',
    nilai: 'Rp 450.000.000',
    nilaiNumerik: 450000000,
    tahun: 2020,
    kondisi: 'Baik',
    kategori_abc: 'B',
    no_seri_pabrik: 'PBRK001',
    // nanti bisa ada qr_payload dari input KIR/KIB
    // qr_payload: 'https://domain/barcode?payload=....'
  },
  // Contoh KIR (inventaris ruangan)
  {
    id: 5,
    jenis: 'KIR',
    sub_jenis: '-',
    kib_type: null,
    kode: '1.03.02.05.005',
    nama: 'Kursi Staf Putar',
    noreg: '003/C',
    merk: 'IKEA MARKUS',
    lokasi: 'Ruang Staf',
    jumlah: 10,
    satuan: 'Buah',
    nilai: 'Rp 12.000.000',
    nilaiNumerik: 12000000,
    tahun: 2021,
    kondisi: 'Baik',
    kategori_abc: 'C',
    // qr_payload: 'https://domain/barcode?payload=....',
    // foto_barang_base64: 'data:image/...'
  },
];

const Dashboard = ({ initialMenuId = 'dashboard' }) => {
  // satu sumber data untuk seluruh aplikasi
  const [dataItems, setDataItems] = useState(initialDataItems);
  const [activeMenuId, setActiveMenuId] = useState(initialMenuId);

  const handleMenuClick = (id) => {
    setActiveMenuId(id);
  };

  const activeMenu = MENU_ITEMS.find((item) => item.id === activeMenuId);
  const activeMenuLabel = activeMenu ? activeMenu.label : 'Dashboard';

  const renderContent = () => {
    switch (activeMenuId) {
      case 'dashboard':
        return <DashboardContent dataItems={dataItems} />;

      case 'master_data':
        return (
          <DataIndukContent
            key="master_data"
            dataItems={dataItems}
            setDataItems={setDataItems}
            initialMode={MODES.VIEW_KIB_B}
          />
        );

      case 'input_kir':
        return (
          <DataIndukContent
            key="input_kir"
            dataItems={dataItems}
            setDataItems={setDataItems}
            initialMode={MODES.ADD_KIR}
          />
        );

      case 'reports':
        return <LaporanKIRContent dataItems={dataItems} />;

      case 'print_labels':
        // PrintLabelsContent nerima semua dataItems
        return <PrintLabelsContent dataItems={dataItems} />;

      case 'configuration':
      default:
        return (
          <div className="p-10 text-center bg-white rounded-xl shadow-lg border border-gray-100 min-h-[500px] flex flex-col items-center justify-center">
            <p className="text-3xl text-gray-600 font-bold">
              🚧 Halaman{' '}
              <span className={`font-extrabold text-${PRIMARY_COLOR}-600`}>
                '{activeMenuLabel}'
              </span>{' '}
              Belum Siap 🚧
            </p>
            <p className="mt-4 text-gray-500 text-base max-w-lg">
              Modul ini masih dalam tahap pengembangan.
            </p>
            <button
              onClick={() => setActiveMenuId('dashboard')}
              className={`mt-6 p-3 px-8 rounded-lg text-white font-bold shadow-md transition duration-200 bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700`}
            >
              Kembali ke Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className={`flex min-h-screen font-sans bg-${BG_COLOR}`}>
      {/* Sidebar disembunyikan saat print */}
      <div className="print:hidden">
        <Sidebar activeMenuId={activeMenuId} onMenuItemClick={handleMenuClick} />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header juga disembunyikan saat print */}
        <div className="print:hidden">
          <Header activeMenuLabel={activeMenuLabel} />
        </div>

        {/* main tetap, isi komponen yang atur sendiri apa yang ke-print */}
        <main className="p-8 flex-1">{renderContent()}</main>

        {/* footer juga disembunyikan saat print */}
        <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-200 print:hidden">
          &copy; 2025 SIMBADA Kecamatan Bandung Kidul. All rights reserved. V1.4.0
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
