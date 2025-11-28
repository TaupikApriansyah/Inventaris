import React from 'react';

const LaporanKIRContent = ({ dataItems }) => {
    const ruanganTarget = 'Kantor'; 
    const dataRuangan = dataItems.filter(item => item.lokasi === ruanganTarget && item.jenis === 'KIB');
    const kepalaRuangan = dataItems.find(item => item.jenis === 'KIR' && item.lokasi === ruanganTarget) || { kode: 'R.XX.XX', nama: 'Ruangan Tidak Ditemukan', mark: 'N/A' };

    const formatRupiah = (nilai) => {
        return nilai.startsWith('Rp') ? nilai : `Rp ${Number(nilai).toLocaleString('id-ID')}`;
    };
    
    const getKondisiSingkat = (kondisi) => {
        if (kondisi === 'Baik' || kondisi === 'Tersedia') return 'B';
        if (kondisi === 'Kurang Baik') return 'KB';
        if (kondisi === 'Rusak Berat') return 'RB';
        return '-';
    };
    
    const handleUpload = (type) => {
        alert(`Simulasi: Fitur Upload ${type} berhasil dipanggil! Di lingkungan nyata, ini akan memproses file untuk Laporan / Data Penyesuaian Laporan.`);
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center border-b pb-4">
                KARTU INVENTARIS RUANGAN (KIR)
            </h1>
            
            <div className="mb-8 flex justify-end space-x-3">
                <button
                    onClick={() => handleUpload('Excel')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md text-sm transition duration-200 flex items-center"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    Upload Data Excel
                </button>
                <button
                    onClick={() => handleUpload('PDF')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md text-sm transition duration-200 flex items-center"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8"></path></svg>
                    Upload Dokumen PDF
                </button>
            </div>

            <div className="grid grid-cols-2 text-sm mb-8 space-y-1">
                <div>
                    <span className="font-semibold">SKPD:</span> Kecamatan Bandung Kidul
                </div>
                <div>
                    <span className="font-semibold">Ruangan:</span> {kepalaRuangan.nama}
                </div>
                <div>
                    <span className="font-semibold">Nomor Kode Lokasi:</span> 12.10.17.38.61.01
                </div>
                <div>
                    <span className="font-semibold">Penanggung Jawab:</span> {kepalaRuangan.mark}
                </div>
                <div>
                    <span className="font-semibold">Tahun Anggaran:</span> 2025
                </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 rounded-lg">
                <table className="min-w-full table-auto text-sm border-collapse">
                    <thead className="bg-gray-100 text-center">
                        <tr className="border-b border-gray-300">
                            <th rowSpan="2" className="px-3 py-3 font-bold text-gray-700 w-12 border-r">No. Urut</th>
                            <th rowSpan="2" className="px-4 py-3 font-bold text-gray-700 w-48 border-r">Nama Barang / Jenis</th>
                            <th colSpan="2" className="px-4 py-2 font-bold text-gray-700 border-r border-b">Spesifikasi</th>
                            <th rowSpan="2" className="px-4 py-3 font-bold text-gray-700 w-20 border-r">Tahun Perolehan</th>
                            <th rowSpan="2" className="px-4 py-3 font-bold text-gray-700 w-24 border-r">No. Register</th>
                            <th rowSpan="2" className="px-4 py-3 font-bold text-gray-700 w-16 border-r">Jumlah</th>
                            <th rowSpan="2" className="px-4 py-3 font-bold text-gray-700 w-24 border-r">Nilai Perolehan</th>
                            <th rowSpan="2" className="px-4 py-3 font-bold text-gray-700 w-16 border-r">Kondisi Barang</th>
                            <th rowSpan="2" className="px-4 py-3 font-bold text-gray-700">Keterangan</th>
                        </tr>
                        <tr className="bg-gray-200 text-xs font-semibold text-gray-600 text-center border-b border-gray-300">
                            <th className="px-3 py-2 border-r">Merk / Model</th>
                            <th className="px-3 py-2 border-r">Bahan / Jenis</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {dataRuangan.length > 0 ? (
                            dataRuangan.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50 text-center">
                                    <td className="px-3 py-2 border-r">{index + 1}</td>
                                    <td className="px-4 py-2 text-left border-r font-medium text-gray-800">{item.nama}</td>
                                    <td className="px-3 py-2 border-r">{item.mark}</td>
                                    <td className="px-3 py-2 border-r">{item.identitas}</td>
                                    <td className="px-4 py-2 border-r">{item.tahun || '-'}</td>
                                    <td className="px-4 py-2 border-r">{item.noreg || '-'}</td>
                                    <td className="px-4 py-2 border-r">{item.jumlah}</td>
                                    <td className="px-4 py-2 text-right border-r font-semibold">{formatRupiah(item.nilai)}</td>
                                    <td className={`px-4 py-2 border-r font-medium ${item.kondisi === 'Rusak Berat' ? 'text-red-600' : 'text-green-600'}`}>{getKondisiSingkat(item.kondisi)}</td>
                                    <td className="px-4 py-2 text-xs">{item.keterangan || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center py-6 text-gray-500 italic">Tidak ada data aset ditemukan di ruangan ini.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-12 text-sm h-32">
                <p className='text-gray-400 italic'>--- Bagian Tanda Tangan Dihilangkan Sesuai Permintaan ---</p>
            </div>
            
        </div>
    );
};

export default LaporanKIRContent;