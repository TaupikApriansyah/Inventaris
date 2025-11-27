import React, { useState, useEffect } from 'react';
import { PRIMARY_COLOR } from '../constants';

const FormKIR = ({ onSave, onCancel }) => {
    // State untuk menampung data input sesuai kolom di Gambar
    const [formData, setFormData] = useState({
        jenis: 'KIR', // Penanda tipe data
        nama_barang: '',
        merek_model: '',
        no_seri_pabrik: '',
        ukuran: '',
        bahan: '',
        tahun_pembuatan: new Date().getFullYear(),
        kode_barang: '',
        no_register: '',
        jumlah_barang: 1,
        harga_perolehan: '',
        keadaan_barang: 'Baik', // Pilihan: Baik, Kurang Baik, Rusak Berat
        keterangan_mutasi: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className={`text-2xl font-bold text-${PRIMARY_COLOR}-700 mb-6 border-b pb-2`}>
                Input Data Kartu Inventaris Ruangan (KIR)
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Baris 1: Identitas Barang */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Barang / Jenis Barang</label>
                        <input required name="nama_barang" type="text" value={formData.nama_barang} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="Contoh: Meja Kerja Kayu" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Merek / Model</label>
                        <input name="merek_model" type="text" value={formData.merek_model} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="Contoh: Olympic / Tipe A" />
                    </div>
                </div>

                {/* Baris 2: Spesifikasi Detail (Sesuai Gambar) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">No. Seri Pabrik</label>
                        <input name="no_seri_pabrik" type="text" value={formData.no_seri_pabrik} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="-" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ukuran</label>
                        <input name="ukuran" type="text" value={formData.ukuran} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="Contoh: 120x60 cm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bahan</label>
                        <input name="bahan" type="text" value={formData.bahan} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="Contoh: Kayu Jati" />
                    </div>
                </div>

                {/* Baris 3: Kode & Tahun */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tahun Pembuatan/Beli</label>
                        <input required name="tahun_pembuatan" type="number" value={formData.tahun_pembuatan} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nomor Kode Barang</label>
                        <input required name="kode_barang" type="text" value={formData.kode_barang} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="xx.xx.xx.xx" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">No. Register</label>
                        <input name="no_register" type="text" value={formData.no_register} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="0001" />
                    </div>
                </div>

                {/* Baris 4: Jumlah & Harga */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Jumlah Barang</label>
                        <input required name="jumlah_barang" type="number" min="1" value={formData.jumlah_barang} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Harga Beli / Perolehan (Rp)</label>
                        <input required name="harga_perolehan" type="number" value={formData.harga_perolehan} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                    </div>
                </div>

                {/* Baris 5: Keadaan & Mutasi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Keadaan Barang</label>
                        <select name="keadaan_barang" value={formData.keadaan_barang} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2">
                            <option value="Baik">Baik (B)</option>
                            <option value="Kurang Baik">Kurang Baik (KB)</option>
                            <option value="Rusak Berat">Rusak Berat (RB)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Keterangan Mutasi</label>
                        <textarea name="keterangan_mutasi" value={formData.keterangan_mutasi} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" rows="2" placeholder="Ket. Mutasi dll..."></textarea>
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end space-x-3 pt-6 border-t mt-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Batal</button>
                    <button type="submit" className={`px-6 py-2 bg-${PRIMARY_COLOR}-600 text-white rounded-lg hover:bg-${PRIMARY_COLOR}-700 shadow-md transition`}>Simpan Data KIR</button>
                </div>
            </form>
        </div>
    );
};

export default FormKIR;