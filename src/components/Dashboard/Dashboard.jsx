// File: src/components/Dashboard/Dashboard.jsx

import React, { useState } from 'react';

// Pastikan MODES diimport dari constants
import { MENU_ITEMS, BG_COLOR, PRIMARY_COLOR, MODES } from '../constants'; 

import Sidebar from '../Layout/Sidebar'; // Placeholder
import Header from '../Layout/Header';   // Placeholder
import DashboardContent from './DashboardContent'; // Placeholder
import DataIndukContent from '../DataInduk/DataIndukContent'; // Placeholder
import LaporanKIRContent from './LaporanKIRContent'; // Placeholder
import PrintLabelsContent from './PrintLabelsContent'; // <-- IMPORT FITUR BARU


// Data Awal (Dummy Data) - Disesuaikan dengan noreg yang lebih sesuai dengan NUP
const initialDataItems = [
    // Data dummy disesuaikan agar cocok dengan tampilan label: 
    // Kode dan noreg diubah agar memiliki format yang umum untuk aset.
    // Kode diubah menjadi format 02.06.xx untuk simulasi KIB B
    { id: 1, kode: '02.06.03.04.01', nama: 'Laptop ASUS VivoBook 14"', mark: 'Asus', identitas: 'X400', jumlah: 1, lokasi: 'Ruang Camat', nilai: 'Rp 5.000.000', nilaiNumerik: 5000000, kondisi: 'Baik', jenis: 'KIB', tahun: 2023, noreg: '0001' },
    { id: 3, kode: '01.01.03.01.01', nama: 'Tanah Bangunan', mark: 'Sertifikat 123', identitas: '100 m²', jumlah: 1, lokasi: 'Lokasi A', nilai: 'Rp 50.000.000', nilaiNumerik: 50000000, kondisi: 'Baik', jenis: 'KIB', tahun: 1997, noreg: '0002' },
    { id: 6, kode: '02.06.01.04.14', nama: 'Kursi Roda', mark: 'GEA', identitas: 'Bebas', jumlah: 2, lokasi: 'Pelayanan Umum', nilai: 'Rp 800.000', nilaiNumerik: 800000, kondisi: 'Baik', jenis: 'KIB', tahun: 2024, noreg: '0003' },
    { id: 7, kode: '02.06.01.04.14', nama: 'Filling Cabinet', mark: 'Metal Sheet', identitas: 'Besi', jumlah: 2, lokasi: 'Ruang Camat', nilai: 'Rp 1.200.000', nilaiNumerik: 1200000, kondisi: 'Baik', jenis: 'KIB', tahun: 1997, noreg: '0004' },
    { id: 8, kode: '02.06.01.01.05', nama: 'Meja Kerja Kayu Jati', mark: 'Kayu Jati', identitas: 'Kayu', jumlah: 1, lokasi: 'Ruang Camat', nilai: 'Rp 3.000.000', nilaiNumerik: 3000000, kondisi: 'Baik', jenis: 'KIB', tahun: 2022, noreg: '0012' },
    { id: 9, kode: '02.06.01.01.10', nama: 'Kursi Putar', mark: 'Informal', identitas: 'PVC', jumlah: 1, lokasi: 'Sub Bagian Umum', nilai: 'Rp 500.000', nilaiNumerik: 500000, kondisi: 'Kurang Baik', jenis: 'KIB', tahun: 2017, noreg: '0013' },
    { id: 10, kode: '02.06.03.02.01', nama: 'PC Desktop', mark: 'Panasonic', identitas: 'Besi', jumlah: 5, lokasi: 'Perpustakaan', nilai: 'Rp 10.000.000', nilaiNumerik: 10000000, kondisi: 'Rusak Berat', jenis: 'KIB', tahun: 2011, noreg: '0014' },
    { id: 11, kode: '02.06.03.02.08', nama: 'Monitor Samsung', mark: 'Samsung', identitas: 'PVC', jumlah: 1, lokasi: 'Perpustakaan', nilai: 'Rp 2.500.000', nilaiNumerik: 2500000, kondisi: 'Baik', jenis: 'KIB', tahun: 2020, noreg: '0015' },
    { id: 12, kode: '02.06.03.03.02', nama: 'Printer', mark: 'Epson L120', identitas: 'Besi', jumlah: 1, lokasi: 'Sub Bagian Umum', nilai: 'Rp 1.000.000', nilaiNumerik: 1000000, kondisi: 'Baik', jenis: 'KIB', tahun: 2014, noreg: '0016' },
    // Aset KIR (Tidak dicetak label)
    { id: 2, kode: 'R.01.01', nama: 'Ruang Kepala', mark: 'Bpk. Dani', identitas: 'Inventaris Ruangan', jumlah: 12, lokasi: 'Kantor', nilai: '-', nilaiNumerik: 0, kondisi: 'Tersedia', jenis: 'KIR', tahun: 0, noreg: '-' },
];


const Dashboard = () => {
    const [dataItems, setDataItems] = useState(initialDataItems);
    const [activeMenuId, setActiveMenuId] = useState('dashboard'); 

    const handleMenuClick = (id) => {
        setActiveMenuId(id);
    };

    const activeMenu = MENU_ITEMS.find(item => item.id === activeMenuId);
    const activeMenuLabel = activeMenu ? activeMenu.label : 'Dashboard';

    const renderContent = () => {
        switch (activeMenuId) {
            case 'dashboard':
                // Menggunakan Placeholder
                return <DashboardContent dataItems={dataItems} />;
            
            case 'master_data':
                // Menggunakan Placeholder
                return (
                    <DataIndukContent 
                        key="master_data" 
                        dataItems={dataItems} 
                        setDataItems={setDataItems} 
                        initialMode={MODES.VIEW_TABLE} 
                    />
                );

            case 'input_kir':
                // Menggunakan Placeholder
                return (
                    <DataIndukContent 
                        key="input_kir" 
                        dataItems={dataItems} 
                        setDataItems={setDataItems} 
                        initialMode={MODES.ADD_KIR} 
                    />
                );

            case 'reports':
                // Menggunakan Placeholder
                return <LaporanKIRContent dataItems={dataItems} />;
            
            case 'print_labels': // <-- AKTIVASI FITUR CETAK LABEL
                return <PrintLabelsContent dataItems={dataItems} />;

            case 'configuration':
            default:
                // Tampilan Halaman Belum Siap
                return (
                    <div className="p-10 text-center bg-white rounded-xl shadow-lg border border-gray-100 min-h-[500px] flex flex-col items-center justify-center">
                        <p className="text-3xl text-gray-600 font-bold">
                            🚧 Halaman <span className={`font-extrabold text-${PRIMARY_COLOR}-600`}>'{activeMenuLabel}'</span> Belum Siap 🚧
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
            <Sidebar activeMenuId={activeMenuId} onMenuItemClick={handleMenuClick} />
            <div className="flex-1 flex flex-col">
                <Header activeMenuLabel={activeMenuLabel} />
                <main className="p-8 flex-1">{renderContent()}</main>
                <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-200">
                    &copy; 2025 SIMBADA Kecamatan Bandung Kidul. All rights reserved. V1.4.0
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;