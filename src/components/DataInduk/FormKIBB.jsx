// File: FormKIBB.jsx

import React, { useState } from 'react';

const FormKIBB = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        // Field KIB Umum
        kode_barang: '',
        nama_barang: '',
        nomor_register: '',
        merek_tipe: '',
        ukuran: '', // Contoh ukuran bisa jadi field umum di KIB B
        bahan: '',
        tahun_perolehan: new Date().getFullYear().toString(),
        asal_usul: 'Pembelian',
        nilai_perolehan: '',
        kondisi: 'Baik',
        lokasi: '',
        jumlah: '1',
        satuan: 'Unit',
        
        // Field KIB B Spesifik
        nomor_rangka: '',
        nomor_mesin: '',
        nomor_pabrik: '',
        // FIELD KUNCI UNTUK FILTERING DI DataIndukContent.jsx
        kibType: 'B', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Memastikan nilai_perolehan adalah string yang hanya berisi angka
        const cleanData = {
            ...formData,
            nilai_perolehan: formData.nilai_perolehan.replace(/\D/g, ''),
        };
        onSave(cleanData);
    };
    
    // Styling Helper
    const inputClass = "w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-4 bg-white rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-700 border-b pb-2 mb-4">Detail KIB B (Mesin dan Peralatan)</h3>

            {/* BARIS 1: Kode, Nama, Register */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kode Barang</label>
                    <input type="text" name="kode_barang" value={formData.kode_barang} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
                    <input type="text" name="nama_barang" value={formData.nama_barang} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nomor Register</label>
                    <input type="text" name="nomor_register" value={formData.nomor_register} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            {/* BARIS 2: Fisik & Perolehan */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tahun Perolehan</label>
                    <input type="number" name="tahun_perolehan" value={formData.tahun_perolehan} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Asal Usul</label>
                    <select name="asal_usul" value={formData.asal_usul} onChange={handleChange} className={inputClass}>
                        <option>Pembelian</option>
                        <option>Hibah</option>
                        <option>Lainnya</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nilai Perolehan (Rp)</label>
                    <input type="text" name="nilai_perolehan" value={formData.nilai_perolehan} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kondisi</label>
                    <select name="kondisi" value={formData.kondisi} onChange={handleChange} className={inputClass}>
                        <option>Baik</option>
                        <option>Kurang Baik</option>
                        <option>Rusak Berat</option>
                    </select>
                </div>
            </div>
            
            <hr className="my-4 border-blue-100" />
            <h4 className="text-lg font-semibold text-blue-600">Spesifikasi Detail (KIB B)</h4>

            {/* BARIS 3: Spesifikasi KIB B */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Merek / Tipe</label>
                    <input type="text" name="merek_tipe" value={formData.merek_tipe} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">No. Rangka</label>
                    <input type="text" name="nomor_rangka" value={formData.nomor_rangka} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">No. Mesin</label>
                    <input type="text" name="nomor_mesin" value={formData.nomor_mesin} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">No. Pabrik</label>
                    <input type="text" name="nomor_pabrik" value={formData.nomor_pabrik} onChange={handleChange} className={inputClass} />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                    <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} className={inputClass} />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Jumlah & Satuan</label>
                    <div className="flex space-x-2">
                        <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} className={`${inputClass} w-1/3`} />
                        <input type="text" name="satuan" value={formData.satuan} onChange={handleChange} className={`${inputClass} w-2/3`} />
                    </div>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button 
                    type="button" 
                    onClick={onCancel} 
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150"
                >
                    Batal
                </button>
                <button 
                    type="submit" 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-semibold"
                >
                    Simpan Data KIB B
                </button>
            </div>
        </form>
    );
};

export default FormKIBB;