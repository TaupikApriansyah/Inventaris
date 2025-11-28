import React, { useState, useMemo } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// --- IMPOR KOMPONEN FORMULIR ---
import FormKIBA from './FormKIBA'; 
import FormKIBB from './FormKIBB'; 
import FormKIBC from './FormKIBC'; 
import FormKIR from './FormKIR'; 
import FormEdit from './FormEdit'; 

// ----------------------------------------------------------------------
// --- KONSTANTA & MODES ---
// ----------------------------------------------------------------------
const MODES = { 
    VIEW_TABLE: 'VIEW_TABLE', EDIT_ITEM: 'EDIT_ITEM', VIEW_KIB_A: 'VIEW_KIB_A', 
    VIEW_KIB_B: 'VIEW_KIB_B', VIEW_KIB_C: 'VIEW_KIB_C', ADD_KIB_A: 'ADD_KIB_A', 
    ADD_KIB_B: 'ADD_KIB_B', ADD_KIB_C: 'ADD_KIB_C', ADD_KIR: 'ADD_KIR',
};
const PRIMARY_COLOR = 'indigo'; 

// ----------------------------------------------------------------------
// --- UTILITY FUNCTIONS ---
// ----------------------------------------------------------------------

const getKategoriABC = (nilaiNumerik) => {
    if (nilaiNumerik > 500000000) { return 'A'; } 
    if (nilaiNumerik > 50000000) { return 'B'; } 
    return 'C'; 
};

const getActiveKibType = (tab) => {
    if (tab === 'KIB A') return 'A';
    if (tab === 'KIB B') return 'B';
    if (tab === 'KIB C') return 'C';
    return null;
};

const getKIBColor = (subJenis) => {
    switch (subJenis) {
        case 'Tanah': return 'text-green-700 border border-green-300 bg-green-50 rounded-full px-2 py-0.5';
        case 'Mesin': return 'text-blue-700 border border-blue-300 bg-blue-50 rounded-full px-2 py-0.5';
        case 'Gedung': return 'text-orange-700 border border-orange-300 bg-orange-50 rounded-full px-2 py-0.5';
        default: return 'text-gray-600 border border-gray-300 bg-gray-100 rounded-full px-2 py-0.5';
    }
};

const getKIBConfig = (kibType) => {
    switch (kibType) {
        case 'A':
            return {
                specialHeader: 'Detail Tanah',
                specialHeaders: ['Ukuran (m²)', 'Status Tanah', 'No. Sertifikat'],
                getData: (item) => [item.ukuran || '-', item.status_tanah || '-', item.no_sertifikat || '-'],
            };
        case 'B':
            return {
                specialHeader: 'Detail Mesin/Peralatan',
                specialHeaders: ['No. Rangka', 'No. Mesin', 'No. Pabrik'],
                getData: (item) => [item.nomor_rangka || '-', item.nomor_mesin || '-', item.nomor_pabrik || '-'],
            };
        case 'C':
            return {
                specialHeader: 'Detail Bangunan',
                specialHeaders: ['Konstruksi', 'Luas Lantai', 'No. Dokumen'],
                getData: (item) => [item.bahan || '-', item.luas_lantai || '-', item.no_dokumen || '-'],
            };
        default:
            return { specialHeader: 'Detail Spesifik', specialHeaders: [], getData: () => [] };
    }
};

const initialDataItems = [
    {
        id: 1, jenis: 'KIB', sub_jenis: 'Tanah', kib_type: 'A', kode: '1.01.01.01.001', nama: 'Tanah Kantor Utama', noreg: '001/T',
        merk: '-', lokasi: 'Jl. Sudirman No. 12', jumlah: 1, satuan: 'Bidang',
        nilai: 'Rp 900.000.000', nilaiNumerik: 900000000, tahun: 2018, asal_usul: 'Pembelian', kondisi: 'Baik',
        kategori_abc: getKategoriABC(900000000), ukuran: '5000 m²', status_tanah: 'Hak Milik', no_sertifikat: 'SHM-1234',
    },
    {
        id: 2, jenis: 'KIB', sub_jenis: 'Mesin', kib_type: 'B', kode: '1.03.01.02.001', nama: 'Mobil Dinas Sedan', noreg: '001/A',
        merk: 'Toyota Camry', lokasi: 'Kantor Utama', jumlah: 1, satuan: 'Unit', 
        nilai: 'Rp 450.000.000', nilaiNumerik: 450000000, tahun: 2020, kondisi: 'Baik',
        kategori_abc: getKategoriABC(450000000), nomor_rangka: 'MT1234567890RNG', nomor_mesin: 'ENG987654321', nomor_pabrik: 'PBRK001'
    },
    {
        id: 5, jenis: 'KIR', sub_jenis: '-', kib_type: null, kode: '1.03.02.05.005', nama: 'Kursi Staf Putar', noreg: '003/C',
        merk: 'IKEA MARKUS', lokasi: 'Ruang Staf', jumlah: 10, satuan: 'Buah',
        nilai: 'Rp 12.000.000', nilaiNumerik: 12000000, tahun: 2021, kondisi: 'Baik', kategori_abc: getKategoriABC(12000000)
    },
];

// ----------------------------------------------------------------------
// --- KOMPONEN UTAMA DataIndukContent ---
// ----------------------------------------------------------------------

const DataIndukContent = ({ initialMode = MODES.VIEW_KIB_B }) => { 
    const [dataItems, setDataItems] = useState(initialDataItems); 
    const [mode, setMode] = useState(initialMode);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Tentukan Tab Aktif berdasarkan Mode
    const activeTab = useMemo(() => {
        if (mode === MODES.ADD_KIR || mode === MODES.VIEW_TABLE || (mode.startsWith('VIEW') && mode.endsWith('KIR'))) return 'KIR';
        if (mode.endsWith('KIB_A') || mode.startsWith('ADD_KIB_A')) return 'KIB A';
        if (mode.endsWith('KIB_B') || mode.startsWith('ADD_KIB_B')) return 'KIB B';
        if (mode.endsWith('KIB_C') || mode.startsWith('ADD_KIB_C')) return 'KIB C';
        return 'KIB B'; 
    }, [mode]);

    const setTabAndMode = (tab, newMode) => {
        setSearchTerm(''); 
        setMode(newMode);
    };
    
    // Penyaringan data
    const filteredItems = useMemo(() => {
        return dataItems.filter(item => {
            const matchesSearch =
                item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.kategori_abc || '').toLowerCase().includes(searchTerm.toLowerCase());
            
            const targetKibType = getActiveKibType(activeTab);
            
            if (activeTab === 'KIR') {
                return matchesSearch && item.jenis === 'KIR';
            } else if (targetKibType) {
                return matchesSearch && item.jenis === 'KIB' && item.kib_type === targetKibType;
            }
            return matchesSearch;
        });
    }, [dataItems, searchTerm, activeTab]);

    // --- Logika CRUD ---
    const handleSaveNewItem = (newItem) => {
        const nilaiNumerik = parseInt(newItem.nilai_perolehan, 10) || 0;
        const newId = dataItems.reduce((max, item) => Math.max(max, item.id), 0) + 1;

        const kibType = newItem.kibType || null; 
        let subJenis = kibType ? (kibType === 'A' ? 'Tanah' : (kibType === 'B' ? 'Mesin' : 'Gedung')) : 'Inventaris Ruangan'; 

        const completeItem = {
            id: newId,
            jenis: kibType ? 'KIB' : 'KIR',
            sub_jenis: subJenis,
            kib_type: kibType,
            kode: newItem.kode_barang || '—',
            nama: newItem.nama_barang,
            noreg: newItem.nomor_register || '—',
            merk: newItem.merek_tipe || newItem.merk || '—', 
            lokasi: newItem.lokasi || '—',
            jumlah: newItem.jumlah || 1, 
            satuan: newItem.satuan || (kibType === 'A' ? 'Bidang' : 'Unit'),
            
            nilai: `Rp ${nilaiNumerik.toLocaleString('id-ID')}`, 
            nilaiNumerik: nilaiNumerik,
            tahun: parseInt(newItem.tahun_perolehan, 10) || new Date().getFullYear(),
            asal_usul: newItem.asal_usul || 'Pembelian',
            kondisi: newItem.kondisi || 'Baik',
            kategori_abc: getKategoriABC(nilaiNumerik),

            // semua field extra dari form (termasuk foto_barang_base64, qr_payload, dsb)
            ...newItem, 
        };

        setDataItems(prev => [...prev, completeItem]);

        let newMode;
        if (completeItem.jenis === 'KIR') {
             newMode = MODES.VIEW_TABLE;
        } else {
             newMode = `VIEW_KIB_${completeItem.kib_type}`;
        }
        
        setMode(newMode); 
        
        alert(`✅ Data ${kibType ? 'KIB ' + kibType : 'KIR'} "${completeItem.nama}" berhasil disimpan!`);
    };
    
    const handleUpdateItem = (updatedItem) => {
        setDataItems(prev => 
            prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
        );
        
        const backMode = updatedItem.jenis === 'KIR' 
            ? MODES.VIEW_TABLE 
            : `VIEW_KIB_${updatedItem.kib_type}`;
        setMode(backMode);
        alert(`✏️ Data ${updatedItem.nama} berhasil diperbarui!`);
    };
    
    const handleDelete = (itemId, itemName) => {
        if (window.confirm(`Hapus data "${itemName}"? Tindakan ini tidak dapat dibatalkan.`)) {
            setDataItems(prev => prev.filter(item => item.id !== itemId));
            alert(`🗑️ Data "${itemName}" berhasil dihapus.`);
        }
    };
    
    const handleStartEdit = (item) => {
        setItemToEdit(item);
        setMode(MODES.EDIT_ITEM);
    };

    // --- RENDER FUNCTIONS ---
    
    const getTabClassName = (tabName) => {
        const isActive = activeTab === tabName;
        let color = 'text-gray-500 hover:text-indigo-700 border-transparent';
        
        if (tabName === 'KIB A') color = isActive ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-700 border-transparent';
        if (tabName === 'KIB B') color = isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-700 border-transparent';
        if (tabName === 'KIB C') color = isActive ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-700 border-transparent';
        if (tabName === 'KIR') color = isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-700 border-transparent';

        return `px-4 py-2 text-sm font-bold transition-all duration-200 border-b-2 ${color}`;
    };

    const renderHeader = () => {
        const addMode = activeTab === 'KIR' ? MODES.ADD_KIR : 
                        activeTab === 'KIB A' ? MODES.ADD_KIB_A :
                        activeTab === 'KIB B' ? MODES.ADD_KIB_B :
                        MODES.ADD_KIB_C;

        const baseExportClass = "flex items-center px-4 py-2.5 rounded-lg font-medium transition duration-200 text-sm bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm";

        return (
            <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-gray-100 mb-4">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">
                            Data Aset <span className="font-bold text-indigo-600">{activeTab}</span>
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">Kelola data aset inventaris negara (KIB/KIR).</p>
                    </div>
                    
                    <div className="flex flex-wrap space-x-3">
                         <button onClick={() => console.log('Export Excel')} className={baseExportClass}>
                             <span className="mr-2 text-lg">⬇️</span> Export Excel Data
                         </button>
                         <button onClick={() => console.log('Export PDF')} className={baseExportClass}>
                             <span className="mr-2 text-lg">📄</span> Export PDF Dokumen
                         </button>
                         <button
                             onClick={() => setMode(addMode)}
                             className={`bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700 text-white px-5 py-2.5 rounded-lg font-bold transition duration-200 flex items-center shadow-md`}
                         >
                             <span className="text-xl mr-2 pb-1">+</span> 
                             {activeTab === 'KIR' ? 'Tambah Data KIR' : `Tambah Data ${activeTab}`}
                         </button>
                    </div>
                </div>

                <div className="flex space-x-6 w-full mb-4 border-b border-gray-200"> 
                    <button onClick={() => setTabAndMode('KIB A', MODES.VIEW_KIB_A)} className={getTabClassName('KIB A')}>🌱 KIB A (Tanah)</button>
                    <button onClick={() => setTabAndMode('KIB B', MODES.VIEW_KIB_B)} className={getTabClassName('KIB B')}>🔩 KIB B (Mesin)</button>
                    <button onClick={() => setTabAndMode('KIB C', MODES.VIEW_KIB_C)} className={getTabClassName('KIB C')}>🏗️ KIB C (Gedung)</button>
                    <button onClick={() => setTabAndMode('KIR', MODES.VIEW_TABLE)} className={getTabClassName('KIR')}>📄 KIR (Inventaris Ruangan)</button>
                </div>

                <div className="mb-6">
                     <input 
                         type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                         placeholder={`Cari data dalam ${activeTab} (Nama, Kode, Kategori ABC)...`}
                         className="px-4 py-2 w-full md:w-96 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                     />
                </div>
            </>
        );
    };

    // ---------- TABEL KIB (dengan slot QR di KIB B) ----------
    const renderTableKIB = () => {
        const targetKibType = getActiveKibType(activeTab);
        const config = getKIBConfig(targetKibType);

        const hasQrColumn = activeTab === 'KIB B'; // QR khusus untuk KIB B
        const totalCols = 10 + config.specialHeaders.length + (hasQrColumn ? 1 : 0); 

        return (
            <div className="overflow-x-auto border border-gray-200 rounded-lg"> 
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase border-b border-gray-300 sticky top-0">
                        <tr>
                            <th colSpan="2" className="border-r border-gray-200 px-3 py-3">Penggolongan</th>
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 bg-indigo-50 text-indigo-700">Jenis KIB</th> 
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3">No. Register</th>
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 w-40">Nama Barang / Spesifikasi</th>
                            <th colSpan={config.specialHeaders.length} className="border-r border-gray-200 px-3 py-3 bg-red-50 text-red-700">{config.specialHeader}</th> 
                            <th colSpan="2" className="border-r border-gray-200 px-3 py-3">Fisik</th>
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 w-16 bg-yellow-50 text-yellow-700">Kategori ABC</th> 
                            <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 w-28">Nilai Perolehan</th>

                            {hasQrColumn && (
                                <th rowSpan="2" className="border-r border-gray-200 px-3 py-3 w-24 bg-indigo-50 text-indigo-700">
                                    QR Code
                                </th>
                            )}

                            <th rowSpan="2" className="px-3 py-3 bg-gray-100">Aksi</th>
                        </tr>
                        <tr>
                            <th className="border-r border-gray-200 px-3 py-2">Kode Barang</th>
                            <th className="border-r border-gray-200 px-3 py-2">Tahun Perolehan</th>
                            
                            {config.specialHeaders.map((header, index) => (
                                <th key={index} className="border-r border-gray-200 px-3 py-2 bg-red-100 text-red-800">
                                    {header}
                                </th>
                            ))}

                            <th className="border-r border-gray-200 px-3 py-2">Jml</th>
                            <th className="border-r border-gray-200 px-3 py-2">Kondisi</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {filteredItems.length > 0 ? filteredItems.map((item, index) => (
                            <tr key={item.id} className={`transition duration-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 border-b border-gray-100`}>
                                <td className="border-r border-gray-100 px-3 py-3 font-mono text-center">{item.kode}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{item.tahun}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">
                                    <span className={`text-xs font-semibold ${getKIBColor(item.sub_jenis)}`}>
                                        {item.kib_type}
                                    </span>
                                </td> 
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{item.noreg}</td>
                                <td className="border-r border-gray-100 px-3 py-3">{item.nama}</td>
                                
                                {config.getData(item).map((data, idx) => (
                                    <td key={idx} className="border-r border-gray-100 px-3 py-3 text-center text-red-600">
                                        {data}
                                    </td>
                                ))}

                                <td className="border-r border-gray-100 px-3 py-3 text-center font-bold">{item.jumlah} {item.satuan}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{item.kondisi}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center font-extrabold text-red-700 bg-yellow-100">{item.kategori_abc}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-right font-bold">{item.nilai}</td>

                                {hasQrColumn && (
                                    <td className="border-r border-gray-100 px-3 py-3 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            {item.qr_payload ? (
                                                <QRCodeCanvas
                                                    value={item.qr_payload}
                                                    size={48}
                                                    includeMargin={false}
                                                />
                                            ) : (
                                                <div className="w-12 h-12 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-[9px] text-gray-400">
                                                    QR
                                                </div>
                                            )}
                                            <span className="mt-1 text-[10px] text-gray-400">Scan Label</span>
                                        </div>
                                    </td>
                                )}

                                <td className="px-3 py-3 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button onClick={() => handleStartEdit(item)} className={`text-${PRIMARY_COLOR}-600 hover:text-${PRIMARY_COLOR}-800 text-xs`}>Edit</button>
                                        <button onClick={() => handleDelete(item.id, item.nama)} className="text-red-600 hover:text-red-800 text-xs">Hapus</button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={totalCols} className="text-center py-10 text-gray-500 italic bg-white">
                                    Tidak ada data {activeTab} yang cocok.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    // ---------- TABEL KIR (dengan QR) ----------
    const renderTableKIR = () => (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase border-b border-gray-300 sticky top-0">
                    <tr>
                        <th className="px-3 py-3 border-r border-gray-200">No</th>
                        <th className="px-3 py-3 border-r border-gray-200">Nama Barang</th>
                        <th className="px-3 py-3 border-r border-gray-200">Merek/Tipe</th>
                        <th className="px-3 py-3 border-r border-gray-200">Kode Barang</th> 
                        <th className="px-3 py-3 border-r border-gray-200">Tahun</th>
                        <th className="px-3 py-3 border-r border-gray-200">Lokasi (Ruangan)</th>
                        <th className="px-3 py-3 border-r border-gray-200">Kondisi</th> 
                        <th className="px-3 py-3 border-r border-gray-200">Jumlah</th> 
                        <th className="px-3 py-3 border-r border-gray-200">Nilai Perolehan</th>
                        <th className="px-3 py-3 border-r border-gray-200 bg-indigo-50 text-indigo-700">QR Code</th>
                        <th className="px-3 py-3 bg-gray-100">Aksi</th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                     {filteredItems.length > 0 ? filteredItems.map((item, index) => item.jenis === 'KIR' && (
                             <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 border-b border-gray-100`}>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{index + 1}</td>
                                <td className="border-r border-gray-100 px-3 py-3">{item.nama}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{item.merk}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center font-mono">{item.kode}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{item.tahun}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center font-semibold">{item.lokasi}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center">{item.kondisi}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-center font-bold">{item.jumlah} {item.satuan}</td>
                                <td className="border-r border-gray-100 px-3 py-3 text-right font-bold">{item.nilai}</td>

                                <td className="border-r border-gray-100 px-3 py-3 text-center">
                                    <div className="inline-flex flex-col items-center">
                                        {item.qr_payload ? (
                                            <QRCodeCanvas
                                                value={item.qr_payload}
                                                size={48}
                                                includeMargin={false}
                                            />
                                        ) : (
                                            <div className="w-12 h-12 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-[9px] text-gray-400">
                                                QR
                                            </div>
                                        )}
                                        <span className="mt-1 text-[10px] text-gray-400">Scan Label</span>
                                    </div>
                                </td>

                                 <td className="px-3 py-3 text-center">
                                     <div className="flex items-center justify-center space-x-2">
                                         <button onClick={() => handleStartEdit(item)} className={`text-${PRIMARY_COLOR}-600 hover:text-${PRIMARY_COLOR}-800 text-xs`}>Edit</button>
                                         <button onClick={() => handleDelete(item.id, item.nama)} className="text-red-600 hover:text-red-800 text-xs">Hapus</button>
                                     </div>
                                </td>
                             </tr>
                        )) : (
                            <tr>
                                <td colSpan="11" className="text-center py-10 text-gray-500 italic bg-white">
                                    Tidak ada data KIR yang cocok.
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );

    const renderViewMode = () => {
        const renderContentTable = activeTab === 'KIR' ? renderTableKIR() : renderTableKIB();
        
        return (
            <div className="p-4 sm:p-8 min-h-[600px]"> 
                {renderHeader()}
                {renderContentTable}
            </div>
        );
    };

    const renderContent = () => {
        if (mode.startsWith('ADD') || mode === MODES.EDIT_ITEM) {
            const getCancelMode = () => {
                if (mode === MODES.ADD_KIB_A) return MODES.VIEW_KIB_A;
                if (mode === MODES.ADD_KIB_B) return MODES.VIEW_KIB_B;
                if (mode === MODES.ADD_KIB_C) return MODES.VIEW_KIB_C;
                return MODES.VIEW_TABLE;
            };

            return (
                <div className="p-8 min-h-[600px] bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Formulir {mode.startsWith('ADD') ? 'Tambah Data Baru' : 'Edit Data Aset'}
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Silakan lengkapi detail aset <strong>{activeTab}</strong> di bawah ini.
                    </p>
                    
                    {mode === MODES.ADD_KIB_A && <FormKIBA onSave={handleSaveNewItem} onCancel={() => setMode(getCancelMode())} />}
                    {mode === MODES.ADD_KIB_B && <FormKIBB onSave={handleSaveNewItem} onCancel={() => setMode(getCancelMode())} />}
                    {mode === MODES.ADD_KIB_C && <FormKIBC onSave={handleSaveNewItem} onCancel={() => setMode(getCancelMode())} />}
                    {mode === MODES.ADD_KIR && <FormKIR onSave={handleSaveNewItem} onCancel={() => setMode(getCancelMode())} />}
                    
                    {mode === MODES.EDIT_ITEM && (
                        <FormEdit 
                            item={itemToEdit} 
                            onSave={handleUpdateItem} 
                            onCancel={() => {
                                const backMode = itemToEdit.jenis === 'KIR' 
                                    ? MODES.VIEW_TABLE 
                                    : `VIEW_KIB_${itemToEdit.kib_type}`;
                                setMode(backMode);
                            }} 
                        />
                    )}
                </div>
            );
        }
        
        return renderViewMode();
    };
    
    return <div className="p-4 bg-gray-50 min-h-screen">{renderContent()}</div>;
};

export default DataIndukContent;
