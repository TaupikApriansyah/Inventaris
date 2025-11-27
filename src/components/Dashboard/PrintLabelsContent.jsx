import React, { useState, useMemo } from 'react';
// Diasumsikan PRIMARY_COLOR adalah 'indigo' atau 'blue' untuk Tailwind
const PRIMARY_COLOR = 'indigo'; 

// --- Komponen Sederhana untuk Layout Label Cetak yang SAMA PERSIS dengan Contoh ---
const LabelTemplate = ({ item }) => {
    // Styling label 3x1 (3 kolom). Lebar dan tinggi disesuaikan untuk kepadatan.
    // 'break-inside-avoid-page' penting agar label tidak terpotong di tengah halaman
    // CATATAN: Lebar dan tinggi disesuaikan untuk simulasi A4 3x1
    return (
        <div className="label-item w-[280px] h-[95px] border border-gray-500 p-1 bg-white break-inside-avoid-page text-gray-900">
            
            {/* BARIS 1: Logo, Instansi, dan Teks ASET DAERAH */}
            <div className="flex items-center justify-between border-b border-gray-400 pb-0.5 mb-0.5">
                <div className="flex items-center">
                    {/* Placeholder Logo (Ganti dengan <img> jika Anda punya file logo) */}
                    <div className="w-4 h-4 mr-1 bg-gray-400 rounded-full flex-shrink-0"></div> 
                    <span className="font-semibold text-[8px] leading-none">PEMERINTAH KOTA BANDUNG</span>
                </div>
                {/* PRIMARY_COLOR diasumsikan indigo/blue untuk kontras */}
                <span className={`font-extrabold text-[8px] text-${PRIMARY_COLOR}-600 leading-none`}>ASET DAERAH</span>
            </div>

            {/* BARIS 2: Barcode dan Detail Utama (Kode, Register, Tahun, Lokasi) */}
            <div className="flex gap-1 items-start h-12">
                
                {/* Kolom Kiri: Barcode Simultan (Statis) */}
                <div className="flex flex-col items-center justify-center w-20 h-full border border-gray-400 p-0.5 flex-shrink-0">
                    <div className="w-full h-8 bg-gray-300 mb-0.5"> 
                        {/* Area untuk Barcode/QR Code. Ganti dengan library generator jika perlu. */}
                    </div>
                    {/* Menggunakan kode register sebagai simulasi data barcode (font kecil dan tebal) */}
                    {/* MENGGUNAKAN item.noreg UNTUK NOMOR REGISTER */}
                    <p className="text-[7px] font-mono leading-none font-bold">
                        {item.noreg || 'N/A'} 
                    </p>
                </div>
                
                {/* Kolom Kanan: Detail Aset (Susunan Rapi) */}
                <div className="flex-1 text-left pt-0.5">
                    {/* Gunakan span dengan lebar tetap (w-10) agar titik dua (:) rata */}
                    <p className="text-[9px] leading-tight">
                        <span className="w-10 inline-block font-bold">Kode</span>: <span className='font-semibold'>{item.kode || 'N/A'}</span>
                    </p>
                    {/* MENGGUNAKAN item.noreg UNTUK NOMOR REGISTER / NUP */}
                    <p className="text-[9px] leading-tight">
                        <span className="w-10 inline-block font-bold">Reg</span>: <span className='font-semibold'>{item.noreg || '-'}</span>
                    </p>
                    <p className="text-[9px] leading-tight">
                        <span className="w-10 inline-block font-bold">Tahun</span>: <span className='font-semibold'>{item.tahun || 'N/A'}</span>
                    </p>
                    <p className="text-[9px] leading-tight">
                        <span className="w-10 inline-block font-bold">Lokasi</span>: <span className='font-semibold'>{item.lokasi || 'N/A'}</span>
                    </p>
                </div>
            </div>

            {/* BARIS 3: Nama Aset (Paling besar dan tebal) */}
            <div className='mt-0.5 border-t border-gray-300 pt-0.5'>
                    <p className="text-[11px] font-extrabold uppercase leading-tight truncate">
                        {item.nama || 'Nama Aset Tidak Tersedia'}
                    </p>
            </div>
            
        </div>
    );
};

// --- Komponen Pratinjau Label Statis untuk Sisi Kanan (MIRIP GAMBAR) ---
const PreviewLabelBox = () => {
    // Data dummy untuk Preview diambil dari screenshot (Laptop ASUS)
    const previewData = {
        kode: '02.06.01.04.01',
        nama: 'Laptop ASUS VivoBook 14"',
        nup: '0001',
        tahun: '2022',
        lokasi: 'KEC. BANDUNG KIDUL' // Lokasi instansi
    }

    return (
        <div className="border border-yellow-500 bg-white p-1 shadow-md w-full max-w-[300px] mx-auto">
            {/* BARIS 1: Instansi & Lokasi (Header) */}
            <div className="flex items-center justify-between border-b border-gray-500 pb-0.5 mb-0.5">
                <div className="flex items-center">
                    <div className="w-3 h-3 mr-1 bg-gray-400 flex-shrink-0"></div> 
                    <span className="font-semibold text-[6px] leading-none">PEMERINTAH KOTA BANDUNG</span>
                </div>
                <span className="font-extrabold text-[6px] text-gray-700 leading-none">KEC. BANDUNG KIDUL</span>
            </div>

            {/* BARIS 2: Barcode & Detail */}
            <div className="flex gap-1 items-start h-10">
                
                {/* Kolom Kiri: Barcode Simultan */}
                <div className="flex flex-col items-center justify-center w-16 h-full border border-gray-400 p-0.5 flex-shrink-0">
                    <div className="w-full h-7 bg-gray-300 mb-0.5"></div> 
                    <p className="text-[5px] font-mono leading-none font-bold">
                        {/* Menggunakan NUP dari data preview */}
                        {previewData.nup}
                    </p>
                </div>
                
                {/* Kolom Kanan: Detail Aset (Rapi) */}
                <div className="flex-1 text-left pt-0.5">
                    <p className="text-[7px] leading-tight">
                        <span className="w-8 inline-block font-bold">Kode</span>: <span className='font-semibold'>{previewData.kode}</span>
                    </p>
                    <p className="text-[7px] leading-tight">
                        <span className="w-8 inline-block font-bold">Nama</span>: <span className='font-semibold'>{previewData.nama}</span>
                    </p>
                    <p className="text-[7px] leading-tight">
                        <span className="w-8 inline-block font-bold">NUP</span>: <span className='font-semibold'>{previewData.nup}</span>
                    </p>
                    <p className="text-[7px] leading-tight">
                        <span className="w-8 inline-block font-bold">Tahun</span>: <span className='font-semibold'>{previewData.tahun}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};


// --- Komponen Konfigurasi Cetak (Sesuai Screenshot) ---
const PrintConfiguration = ({ selectedCount, onPrint }) => {
    // Dummy state untuk meniru opsi konfigurasi di gambar
    const [paperSize, setPaperSize] = useState('Kertas Sticker A4 (Grid)');
    const [showQrCode, setShowQrCode] = useState(false);
    // Mengubah default menjadi true sesuai gambar
    const [showPemdaLogo, setShowPemdaLogo] = useState(true); 

    return (
        <div className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-lg font-bold mb-4 flex items-center">
                ⚙️ Konfigurasi Cetak (Satuan)
            </h2>
            
            {/* Pratinjau Label */}
            <div className="mb-4">
                <p className="font-semibold text-sm mb-2">Preview Label (Satuan)</p>
                <PreviewLabelBox />
            </div>

            <hr className="my-4" />

            {/* Ukuran Kertas */}
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran Kertas</label>
                <select 
                    value={paperSize} 
                    onChange={(e) => setPaperSize(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option>Kertas Sticker A4 (Grid)</option>
                    <option>Kertas Sticker Tom & Jerry 121</option>
                    <option>Kertas A4 Utuh</option>
                </select>
            </div>

            {/* Opsi Tampilkan QR Code */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Tampilkan QR Code</span>
                <input
                    type="checkbox"
                    checked={showQrCode}
                    onChange={(e) => setShowQrCode(e.target.checked)}
                    className={`rounded text-${PRIMARY_COLOR}-600 focus:ring-${PRIMARY_COLOR}-500`}
                />
            </div>
            
            {/* Opsi Tampilkan Logo Pemda */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Tampilkan Logo Pemda</span>
                <input
                    type="checkbox"
                    checked={showPemdaLogo}
                    onChange={(e) => setShowPemdaLogo(e.target.checked)}
                    className={`rounded text-${PRIMARY_COLOR}-600 focus:ring-${PRIMARY_COLOR}-500`}
                />
            </div>

            {/* Tombol Cetak */}
            <button 
                onClick={onPrint} 
                className={`w-full bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition duration-200`}
                disabled={selectedCount === 0}
            >
                Cetak ({selectedCount}) Label
            </button>

            {/* Tips */}
            <div className="mt-4 p-3 bg-blue-100 text-blue-800 text-xs rounded-md">
                <p className="font-bold">Tips:</p>
                <p>Gunakan kertas label **Tom & Jerry No. 121** atau **Sticker HVS A4 Utuh** untuk hasil terbaik.</p>
            </div>
        </div>
    );
}

// --- Komponen Utama ---
const PrintLabelsContent = ({ dataItems }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    // Dummy state untuk meniru filter di gambar
    const [assetType, setAssetType] = useState('KIB B');
    const [roomLocation, setRoomLocation] = useState('Ruang Camat');

    // Filter hanya aset KIB (jenis != KIR) yang memiliki nilai numerik > 0
    const printableItems = useMemo(() => 
        // Mengubah filter agar sesuai dengan data dummy: 
        // Filter item dengan nilaiNumerik > 0
        dataItems.filter(item => item.nilaiNumerik > 0 && 
            // Filter berdasarkan assetType (hanya untuk tampilan KIB B/E di UI, tidak diimplementasikan penuh)
            (assetType === 'KIB B' ? item.kode.includes('02.06') || item.kode.includes('01.01') : true) &&
            // Filter Lokasi (tidak diimplementasikan penuh, hanya menampilkan semua item yang 'Baik' / tersedia)
            (roomLocation === 'Ruang Camat' ? item.lokasi === 'Kantor' || item.lokasi === 'Gudang' : true)
        )
    , [dataItems, assetType, roomLocation]);

    const handleToggleSelect = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) 
                ? prev.filter(itemId => itemId !== id) 
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === printableItems.length && printableItems.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(printableItems.map(item => item.id));
        }
    };
    
    // Filter item yang dipilih untuk dicetak
    const selectedItems = printableItems.filter(item => selectedIds.includes(item.id));

    const handlePrint = () => {
        // Hanya panggil window.print()
        window.print();
    };

    // Data Dummy Lokasi (Sesuai Gambar)
    const locations = [
        'Semua Ruangan', 'Ruang Camat', 'Pelayanan Umum', 'Sub Bagian Umum', 'Perpustakaan'
    ];
    
    // Untuk menampilkan simulasi data di tabel
    const displayedItems = printableItems.filter(item => {
        // Filter minimal agar tabel tidak terlalu kosong, 
        // hanya menampilkan item yang kondisinya 'Baik' atau 'Kurang Baik'
        return item.kondisi === 'Baik' || item.kondisi === 'Kurang Baik';
    });


    return (
        <div className="w-full text-gray-800">
            <h1 className="text-2xl font-bold mb-4 print:hidden">
                🖨️ Cetak Label & Barcode Aset
            </h1>
            
            {/* AREA UTAMA: Layout 2 Kolom (Daftar Aset & Konfigurasi) - Hidden saat print */}
            <div className="flex gap-6 print:hidden">
                
                {/* Kolom Kiri: Pencarian dan Daftar Aset */}
                <div className="flex-1 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">
                        Daftar Aset
                    </h2>
                    
                    {/* Area Filter (Dibuat mirip screenshot) */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Cari Aset</label>
                            <input
                                type="text"
                                placeholder="Nama Barang, Kode, atau NUP..."
                                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Lokasi Ruangan</label>
                            <select 
                                value={roomLocation} 
                                onChange={(e) => setRoomLocation(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                {locations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <button 
                            onClick={() => setAssetType('KIB B')}
                            className={`px-4 py-1 text-sm rounded-full transition-colors ${
                                assetType === 'KIB B' ? `bg-${PRIMARY_COLOR}-600 text-white` : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            KIB B
                        </button>
                        <button 
                            onClick={() => setAssetType('KIB E')}
                            className={`px-4 py-1 text-sm rounded-full transition-colors ${
                                assetType === 'KIB E' ? `bg-${PRIMARY_COLOR}-600 text-white` : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            KIB E
                        </button>
                    </div>

                    <hr className="my-4" />
                    
                    {/* Tabel Pemilihan Aset */}
                    <div className="flex justify-between items-center mb-4">
                           <p className="text-sm text-gray-600">
                                Total Aset KIB Siap Cetak: <span className="font-bold text-lg">{printableItems.length}</span>
                           </p>
                    </div>

                    <div className="overflow-y-auto max-h-[400px] border border-gray-200 rounded-md">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="p-3">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedIds.length === printableItems.length && printableItems.length > 0} 
                                            onChange={handleSelectAll}
                                            className={`rounded text-${PRIMARY_COLOR}-600 focus:ring-${PRIMARY_COLOR}-500`}
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama Aset
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kode / NUP
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lokasi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {displayedItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="p-3 text-center">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedIds.includes(item.id)}
                                                onChange={() => handleToggleSelect(item.id)}
                                                className={`rounded text-${PRIMARY_COLOR}-600 focus:ring-${PRIMARY_COLOR}-500`}
                                            />
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">
                                            {item.nama}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-500">
                                            {item.kode} / {item.noreg}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-500">
                                            {item.lokasi}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Kolom Kanan: Konfigurasi Cetak (Komponen Baru) */}
                <div className="w-96 flex-shrink-0">
                    <PrintConfiguration selectedCount={selectedIds.length} onPrint={handlePrint} />
                </div>
            </div>

            {/* AREA CETAK (Mode Print Only) */}
            <div className="print-area p-4 hidden print:block">
                {/* Grid 3 kolom untuk layout cetak label per halaman */}
                <div className="grid grid-cols-3 gap-4">
                    {selectedItems.map(item => (
                        <LabelTemplate key={item.id} item={item} />
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default PrintLabelsContent;