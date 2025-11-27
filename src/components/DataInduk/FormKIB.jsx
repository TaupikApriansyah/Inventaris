import React, { useState } from 'react';

// Pastikan file constants.js memiliki definisi ini:
// export const MODES = { VIEW_TABLE: 'VIEW_TABLE', ADD_KIB: 'ADD_KIB', ADD_KIR: 'ADD_KIR', EDIT_ITEM: 'EDIT_ITEM' };
// export const PRIMARY_COLOR = 'indigo'; 
import { MODES, PRIMARY_COLOR } from '../constants'; 

// Asumsi komponen FormKIB, FormKIR, dan FormEdit sudah ada
import FormKIB from './FormKIB'; 
import FormKIR from './FormKIR'; 
import FormEdit from './FormEdit';

// --- FUNGSI UTILITY UNTUK MENENTUKAN KATEGORI ABC ---
const getKategoriABC = (nilaiNumerik) => {
    // A: Nilai > Rp 50 Juta
    if (nilaiNumerik > 50000000) {
        return 'A'; 
    // B: Nilai > Rp 5 Juta hingga Rp 50 Juta
    } else if (nilaiNumerik > 5000000) {
        return 'B'; 
    // C: Nilai <= Rp 5 Juta
    } else {
        return 'C'; 
    }
};

// --- DATA INIAL UNTUK DEMO (LENGKAP DENGAN KATEGORI ABC OTOMATIS) ---
const initialDataItems = [
    // Contoh 1: Kendaraan Dinas (Kategori A - KIB)
    {
        id: 1, jenis: 'KIB', kode: '1.03.01.02.001', nama: 'Mobil Dinas Sedan', noreg: '001/A',
        merk: 'Toyota Camry', lokasi: 'Kantor Utama', nopol: 'B 1000 ABC',
        norangka: 'MT1234567890RNG', nobpkb: 'BPKB99001', jumlah: 1, satuan: 'Unit',
        nilai: 'Rp 450.000.000', nilaiNumerik: 450000000, tahun: 2020,
        asal_usul: 'Pembelian', status_penggunaan: 'Digunakan Sendiri',
        kondisi: 'Baik', no_seri: '-', ukuran: '-', bahan: 'Besi/Logam',
        keterangan: 'Aset Operasional Kepala Divisi.',
        kategori_abc: getKategoriABC(450000000)
    },
    // Contoh 2: Peralatan Kantor Besar (Kategori B - KIB)
    {
        id: 2, jenis: 'KIB', kode: '1.03.02.01.001', nama: 'Komputer Desktop Set', noreg: '002/B',
        merk: 'Dell Optiplex 7000', lokasi: 'Ruangan IT', nopol: '-',
        norangka: '-', nobpkb: '-', jumlah: 5, satuan: 'Unit',
        nilai: 'Rp 50.000.000', nilaiNumerik: 50000000, tahun: 2022,
        asal_usul: 'Pembelian', status_penggunaan: 'Digunakan Sendiri',
        kondisi: 'Kurang Baik', no_seri: 'PC98765A', ukuran: 'Standar',
        bahan: 'Plastik/Logam', keterangan: '5 Unit komputer untuk Staf IT.',
        kategori_abc: getKategoriABC(50000000) 
    },
    // Contoh 3: Inventaris Ruangan (Kategori B - KIR/KIB)
    {
        id: 3, jenis: 'KIB', kode: '1.03.02.05.005', nama: 'Kursi Staf Putar', noreg: '003/C',
        merk: 'IKEA MARKUS', lokasi: 'Ruang Staf', nopol: '-',
        norangka: '-', nobpkb: '-', jumlah: 10, satuan: 'Buah',
        nilai: 'Rp 12.000.000', nilaiNumerik: 12000000, tahun: 2021,
        asal_usul: 'Pembelian', status_penggunaan: 'Digunakan Sendiri',
        kondisi: 'Baik', no_seri: 'KRSI01-KRSI10', ukuran: '60x60x120 cm',
        bahan: 'Mesh/Kain', keterangan: '10 Kursi di Ruang Staf 1.',
        kategori_abc: getKategoriABC(12000000)
    },
    // Contoh 4: Inventaris Rendah (Kategori C - KIB)
    {
        id: 4, jenis: 'KIB', kode: '1.03.02.01.005', nama: 'Mouse Komputer', noreg: '004/M',
        merk: 'Logitech', lokasi: 'Ruangan IT', nopol: '-',
        norangka: '-', nobpkb: '-', jumlah: 50, satuan: 'Unit',
        nilai: 'Rp 2.500.000', nilaiNumerik: 2500000, tahun: 2023,
        asal_usul: 'Pembelian', status_penggunaan: 'Digunakan Sendiri',
        kondisi: 'Baik', no_seri: '-', ukuran: 'Kecil', bahan: 'Plastik',
        keterangan: 'Stok mouse untuk cadangan.',
        kategori_abc: getKategoriABC(2500000)
    },
    // Contoh 5: Item KIR Khusus (Jika ada data yang hanya dicatat di KIR)
    {
        id: 5, jenis: 'KIR', kode: '1.03.02.05.006', nama: 'Tanaman Hias Ruangan', noreg: '005/T',
        merk: 'Lokal', lokasi: 'Lobi', nopol: '-',
        norangka: '-', nobpkb: '-', jumlah: 5, satuan: 'Pot',
        nilai: 'Rp 500.000', nilaiNumerik: 500000, tahun: 2024,
        asal_usul: 'Pembelian', status_penggunaan: 'Digunakan Sendiri',
        kondisi: 'Baik', no_seri: '-', ukuran: 'Sedang', bahan: 'Plastik',
        keterangan: 'Hanya dicatat di KIR, tidak termasuk KIB Utama.',
        kategori_abc: getKategoriABC(500000)
    },
];

const DataIndukContent = ({ initialMode = MODES.VIEW_TABLE }) => {
    // Menggunakan initialDataItems sebagai nilai awal dataItems
    const [dataItems, setDataItems] = useState(initialDataItems); 
    const [mode, setMode] = useState(initialMode);
    const [activeTab, setActiveTab] = useState('KIB'); 
    const [itemToEdit, setItemToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const getNextId = () => dataItems.length > 0 ? Math.max(...dataItems.map(item => item.id)) + 1 : 1;

    // Filter Data berdasarkan Tab & Search
    const filteredItems = dataItems.filter(item => {
        const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.kategori_abc.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Tab KIB hanya menampilkan item dengan jenis 'KIB'
        if (activeTab === 'KIB') {
            return item.jenis === 'KIB' && matchesSearch;
        }
        // Tab KIR menampilkan semua item (KIB & KIR)
        return matchesSearch; 
    });

    // --- LOGIKA PENYIMPANAN DATA ---
    const handleSaveNewItem = (newItem) => {
        const nextId = getNextId();
        let formattedNewItem = {};
        
        // Menentukan Nilai Numerik untuk perhitungan Kategori ABC
        const numericValue = Number(newItem.nilai_perolehan || newItem.nilai || newItem.harga_perolehan || 0);

        // 1. Simpan KIB (Data Master Aset)
        if (activeTab === 'KIB' || newItem.jenis === 'KIB') {
            const yearValue = newItem.tanggal_perolehan ? new Date(newItem.tanggal_perolehan).getFullYear() : (newItem.tahun || new Date().getFullYear());

            formattedNewItem = {
                id: nextId,
                jenis: 'KIB', 
                kode: newItem.kode_barang || newItem.kode,
                nama: newItem.nama_barang || newItem.nama,
                noreg: newItem.nomor_register || newItem.noreg || '-',
                merk: newItem.merek_tipe || newItem.merk || '-',
                lokasi: newItem.lokasi || 'Gudang',
                
                // Detail KIB Spesifik
                nopol: newItem.nomor_polisi || '-',
                norangka: newItem.nomor_rangka || '-',
                nobpkb: newItem.nomor_bpkb || '-',
                
                jumlah: Number(newItem.jumlah),
                satuan: newItem.satuan || 'Unit',
                nilai: `Rp ${numericValue.toLocaleString('id-ID')}`,
                nilaiNumerik: numericValue,
                tahun: yearValue,
                asal_usul: newItem.cara_perolehan || 'Pembelian',
                status_penggunaan: newItem.status_penggunaan || 'Digunakan Sendiri',
                
                // Field KIR & Kategori ABC
                kondisi: newItem.kondisi || 'Baik', 
                no_seri: newItem.no_seri_pabrik || newItem.no_seri || '-',
                ukuran: newItem.ukuran || '-',
                bahan: newItem.bahan || '-',
                kategori_abc: getKategoriABC(numericValue), 
                keterangan: newItem.keterangan || '-'
            };
        } 
        // 2. Simpan KIR (Data Inventaris Ruangan Khusus, diinput dari Form KIR)
        else {
            formattedNewItem = {
                id: nextId,
                jenis: 'KIR', 
                nama: newItem.nama_barang,          
                merk: newItem.merek_model || '-',   
                no_seri: newItem.no_seri_pabrik || '-', 
                ukuran: newItem.ukuran || '-',      
                bahan: newItem.bahan || '-',        
                tahun: newItem.tahun_pembuatan,     
                kode: newItem.kode_barang,          
                jumlah: Number(newItem.jumlah_barang),
                noreg: newItem.no_register || '-',  
                nilai: `Rp ${numericValue.toLocaleString('id-ID')}`, 
                nilaiNumerik: numericValue,
                kondisi: newItem.keadaan_barang,    
                kategori_abc: getKategoriABC(numericValue), 
                keterangan: newItem.keterangan_mutasi || '-' 
            };
        }

        setDataItems(prev => [formattedNewItem, ...prev]); 
        setMode(MODES.VIEW_TABLE);
        setActiveTab(formattedNewItem.jenis === 'KIB' ? 'KIB' : 'KIR'); // Kembali ke tab yang relevan
    };

    const handleDelete = (itemId, itemName) => {
        if (window.confirm(`Hapus data "${itemName}"? Tindakan ini tidak dapat dibatalkan.`)) {
            setDataItems(prev => prev.filter(item => item.id !== itemId));
        }
    };
    
    const handleStartEdit = (item) => {
        setItemToEdit(item);
        setMode(MODES.EDIT_ITEM);
    };

    const handleSaveEdit = (updatedItem) => {
        const numericValue = updatedItem.nilaiNumerik || Number(updatedItem.nilai?.replace(/[^0-9,-]+/g,"").replace(",", ".") || 0);

        const savedItem = {
            ...updatedItem,
            nilai: `Rp ${numericValue.toLocaleString('id-ID')}`,
            nilaiNumerik: numericValue,
            kategori_abc: getKategoriABC(numericValue) // UPDATE KATEGORI ABC
        };

        setDataItems(prev => prev.map(item => {
            if (item.id === savedItem.id) return savedItem;
            return item;
        }));
        setItemToEdit(null);
        setMode(MODES.VIEW_TABLE);
    };

    // --- RENDER TABEL KIB ---
    const renderTableKIB = () => (
        <div className="overflow-x-auto border border-gray-400 mt-4">
            <table className="min-w-full table-auto border-collapse border border-gray-400">
                <thead className="bg-gray-100 text-center text-xs font-bold text-gray-800">
                    <tr>
                        <th colSpan="2" className="border border-gray-600 px-2 py-2">Penggolongan dan Kodefikasi Barang</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2 w-20">NIBAR</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Nomor Register</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Spesifikasi Nama Barang</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Spesifikasi Lainnya</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Merek/Tipe</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Lokasi</th>
                        <th colSpan="3" className="border border-gray-600 px-2 py-2">Kendaraan Dinas*)</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Kategori ABC</th> {/* <-- KOLOM KATEGORI ABC */}
                        <th colSpan="2" className="border border-gray-600 px-2 py-2">Jumlah</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Harga Satuan</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Nilai Perolehan</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Cara Perolehan</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Tahun Perolehan</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2">Keterangan</th>
                        <th rowSpan="2" className="border border-gray-600 px-2 py-2 bg-gray-200">Aksi</th>
                    </tr>
                    <tr>
                        <th className="border border-gray-600 px-2 py-2">Kode Barang</th>
                        <th className="border border-gray-600 px-2 py-2">Nama Barang</th>
                        <th className="border border-gray-600 px-2 py-2">Nomor Polisi</th>
                        <th className="border border-gray-600 px-2 py-2">Nomor Rangka</th>
                        <th className="border border-gray-600 px-2 py-2">Nomor BPKB</th>
                        <th className="border border-gray-600 px-2 py-2">Jumlah</th>
                        <th className="border border-gray-600 px-2 py-2">Satuan</th>
                    </tr>
                </thead>

                <tbody className="text-xs">
                    {filteredItems.length > 0 ? filteredItems.map((item, index) => (
                        <tr key={item.id} className={`hover:bg-gray-50 transition duration-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="border border-gray-400 px-2 py-2 font-medium">{item.kode}</td>
                            <td className="border border-gray-400 px-2 py-2">{item.nama}</td>
                            <td className="border border-gray-400 px-2 py-2 text-center">-</td>
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.noreg}</td>
                            <td className="border border-gray-400 px-2 py-2">{item.nama}</td>
                            <td className="border border-gray-400 px-2 py-2 text-center">-</td>
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.merk}</td>
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.lokasi}</td>
                            
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.nopol}</td>
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.norangka}</td>
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.nobpkb}</td>
                            
                            <td className="border border-gray-400 px-2 py-2 text-center font-bold">{item.kategori_abc}</td> 

                            <td className="border border-gray-400 px-2 py-2 text-center font-bold">{item.jumlah}</td>
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.satuan}</td>
                            
                            <td className="border border-gray-400 px-2 py-2 text-right">
                                {item.nilaiNumerik && item.jumlah 
                                    ? `Rp ${(item.nilaiNumerik / item.jumlah).toLocaleString('id-ID')}` 
                                    : '-'}
                            </td>
                            <td className="border border-gray-400 px-2 py-2 text-right font-medium">{item.nilai}</td>
                            
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.asal_usul}</td>
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.tahun}</td>
                            
                            <td className="border border-gray-400 px-2 py-2 text-center">{item.keterangan}</td>

                            <td className="border border-gray-400 px-2 py-2 text-center">
                                <div className="flex items-center justify-center space-x-1">
                                    <button onClick={() => handleStartEdit(item)} className={`text-${PRIMARY_COLOR}-600 hover:text-${PRIMARY_COLOR}-800 p-1`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </button>
                                    <button onClick={() => handleDelete(item.id, item.nama)} className="text-red-600 hover:text-red-800 p-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1 1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="19" className="text-center py-6 text-gray-500 italic">Belum ada data KIB.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    // --- RENDER TABEL KIR ---
    const renderTableKIR = () => (
        <div className="overflow-x-auto border border-black mt-4 shadow-sm">
            <table className="min-w-full table-auto border-collapse border border-black">
                <thead className="bg-gray-200 text-center text-xs font-bold text-black uppercase tracking-tight">
                    <tr>
                        <th rowSpan="2" className="border border-black px-1 py-2 w-10">No. Urut</th>
                        <th rowSpan="2" className="border border-black px-2 py-2 w-48">Nama Barang /<br/>Jenis Barang</th>
                        <th rowSpan="2" className="border border-black px-2 py-2">Merek Model</th>
                        <th rowSpan="2" className="border border-black px-2 py-2">No. Seri<br/>Pabrik</th>
                        <th rowSpan="2" className="border border-black px-2 py-2">Ukuran</th>
                        <th rowSpan="2" className="border border-black px-2 py-2">Bahan</th>
                        <th rowSpan="2" className="border border-black px-2 py-2">Tahun<br/>Pembuatan /<br/>Pembelian</th>
                        <th rowSpan="2" className="border border-black px-2 py-2">Nomor Kode<br/>Barang</th>
                        <th rowSpan="2" className="border border-black px-2 py-2">Kategori ABC</th> {/* <-- KOLOM KATEGORI ABC */}
                        <th rowSpan="2" className="border border-black px-2 py-2">Jumlah Barang<br/>Register</th>
                        <th rowSpan="2" className="border border-black px-2 py-2">Harga Beli /<br/>Perolehan</th>
                        <th colSpan="3" className="border border-black px-1 py-1">Keadaan Barang</th>
                        <th rowSpan="2" className="border border-black px-2 py-2">Keterangan<br/>Mutasi</th>
                        <th rowSpan="2" className="border border-black px-2 py-2 bg-gray-200">Aksi</th>
                    </tr>
                    <tr>
                        <th className="border border-black px-1 py-1 w-12">Baik (B)</th>
                        <th className="border border-black px-1 py-1 w-12">Kurang Baik (KB)</th>
                        <th className="border border-black px-1 py-1 w-12">Rusak Berat (RB)</th>
                    </tr>
                </thead>
                <tbody className="text-xs text-black">
                    {filteredItems.length > 0 ? filteredItems.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50 border-b border-black">
                            <td className="border border-black px-2 py-2 text-center">{index + 1}</td>
                            <td className="border border-black px-2 py-2 font-semibold">{item.nama}</td>
                            <td className="border border-black px-2 py-2 text-center">{item.merk}</td>
                            <td className="border border-black px-2 py-2 text-center">{item.no_seri || '-'}</td>
                            <td className="border border-black px-2 py-2 text-center">{item.ukuran || '-'}</td>
                            <td className="border border-black px-2 py-2 text-center">{item.bahan || '-'}</td>
                            <td className="border border-black px-2 py-2 text-center">{item.tahun}</td>
                            <td className="border border-black px-2 py-2 text-center font-mono">{item.kode}</td>
                            <td className="border border-black px-2 py-2 text-center font-bold">{item.kategori_abc}</td> {/* <-- DATA KATEGORI ABC */}
                            <td className="border border-black px-2 py-2 text-center">{item.jumlah} / {item.noreg}</td>
                            <td className="border border-black px-2 py-2 text-right">{item.nilai}</td>
                            
                            {/* CHECKLIST KONDISI */}
                            <td className="border border-black px-2 py-2 text-center font-bold">{item.kondisi === 'Baik' ? 'v' : ''}</td>
                            <td className="border border-black px-2 py-2 text-center font-bold">{item.kondisi === 'Kurang Baik' ? 'v' : ''}</td>
                            <td className="border border-black px-2 py-2 text-center font-bold">{item.kondisi === 'Rusak Berat' ? 'v' : ''}</td>
                            
                            <td className="border border-black px-2 py-2 text-center">{item.keterangan}</td>
                            <td className="border border-black px-2 py-2 text-center">
                                <div className="flex items-center justify-center space-x-1">
                                    <button onClick={() => handleStartEdit(item)} className={`text-${PRIMARY_COLOR}-600 hover:text-${PRIMARY_COLOR}-800 p-1`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </button>
                                    {/* Item KIR yang tidak memiliki data KIB, tetap dapat dihapus/diedit */}
                                    <button onClick={() => handleDelete(item.id, item.nama)} className="text-red-600 hover:text-red-800 p-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1 1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="16" className="text-center py-8 text-gray-500 italic">Belum ada data KIR.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const renderViewMode = () => (
        <div className="bg-white rounded-xl shadow-lg p-6 min-h-[600px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-800">Data Induk (Master Data)</h2>
                    <p className="text-gray-500 text-sm mt-1">Kelola data Aset Barang (KIB) dan Inventaris Ruangan (KIR).</p>
                </div>
                
                <button
                    onClick={() => setMode(activeTab === 'KIB' ? MODES.ADD_KIB : MODES.ADD_KIR)}
                    className={`bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition duration-200 flex items-center mt-4 md:mt-0`}
                >
                    <span className="text-xl mr-2 pb-1">+</span> 
                    {activeTab === 'KIB' ? 'Tambah Aset (KIB)' : 'Tambah Data KIR (Non-KIB)'}
                </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
                <button 
                    onClick={() => setActiveTab('KIB')}
                    className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-200 ${
                        activeTab === 'KIB' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    📂 Data Aset Barang (KIB)
                </button>
                <button 
                    onClick={() => setActiveTab('KIR')}
                    className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-200 ${
                        activeTab === 'KIR' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    📄 Kartu Inventaris Ruangan (KIR)
                </button>
            </div>

            {/* SEARCH */}
            <div className="mb-4">
                 <input 
                    type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari data (Nama, Kode, Kategori ABC)..."
                    className="px-4 py-2 w-full md:w-96 rounded-lg border border-gray-300 focus:ring-indigo-500"
                />
            </div>

            {/* CONTENT */}
            {activeTab === 'KIB' ? renderTableKIB() : renderTableKIR()}
        </div>
    );

    const renderContent = () => {
        switch (mode) {
            case MODES.ADD_KIB: return <FormKIB onSave={handleSaveNewItem} onCancel={() => setMode(MODES.VIEW_TABLE)} />;
            case MODES.ADD_KIR: return <FormKIR onSave={handleSaveNewItem} onCancel={() => setMode(MODES.VIEW_TABLE)} />;
            case MODES.EDIT_ITEM: return <FormEdit item={itemToEdit} onSave={handleSaveEdit} onCancel={() => setMode(MODES.VIEW_TABLE)} />;
            default: return renderViewMode();
        }
    };
    
    return <div className="space-y-6">{renderContent()}</div>;
};

export default DataIndukContent;