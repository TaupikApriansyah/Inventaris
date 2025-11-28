// FormKIBA.jsx
import React, { useState } from 'react';

const FormKIBA = ({ onSave, onCancel }) => {
    // State untuk menampung input KIB A
    const [formData, setFormData] = useState({
        // Field Umum
        nama_barang: '',
        kode_barang: '',
        nomor_register: '',
        nilai_perolehan: '', // Penting: Harus berupa angka saat diisi
        tahun_perolehan: new Date().getFullYear().toString(),
        keterangan: '',
        kibType: 'A', // Identifier KIB

        // Field Spesifik KIB A (Tanah)
        luas_tanah: '', // Penting: Hanya angka
        status_tanah: 'Hak Milik',
        nomor_sertifikat: '',
        // Tambahkan field KIB A lain jika ada
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Cek data minimal sebelum simpan
        if (!formData.nama_barang || !formData.nilai_perolehan || !formData.luas_tanah) {
             alert("Harap isi Nama Barang, Nilai Perolehan, dan Luas Tanah.");
             return;
        }

        // Kirim data ke parent (DataIndukContent)
        // Nilai dikirim sebagai string, konversi ke numerik akan dilakukan di DataIndukContent
        onSave(formData);
    };

    return (
        // DIHAPUS: bg-white, rounded-xl, shadow-lg, p-6
        // Cukup tambahkan padding di bagian dalam formulir saja
        <div> 
            <h2 className="text-2xl font-bold text-green-700 mb-6 border-b pb-3">🌱 Tambah Data KIB A (Tanah)</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Bagian Input Umum */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
                        <input type="text" name="nama_barang" value={formData.nama_barang} onChange={handleChange} required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kode Barang</label>
                        <input type="text" name="kode_barang" value={formData.kode_barang} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nilai Perolehan (Rp)</label>
                        <input type="number" name="nilai_perolehan" value={formData.nilai_perolehan} onChange={handleChange} required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tahun Perolehan</label>
                        <input type="number" name="tahun_perolehan" value={formData.tahun_perolehan} onChange={handleChange} required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>

                {/* Bagian Input Spesifik KIB A */}
                <h3 className="text-lg font-semibold text-gray-800 pt-4 border-t mt-4">Detail Spesifik Tanah</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Luas Tanah (m²)</label>
                        <input type="number" name="luas_tanah" value={formData.luas_tanah} onChange={handleChange} required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status Tanah</label>
                        <select name="status_tanah" value={formData.status_tanah} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="Hak Milik">Hak Milik</option>
                            <option value="Hak Guna Usaha">Hak Guna Usaha</option>
                            <option value="Hak Pakai">Hak Pakai</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nomor Sertifikat</label>
                        <input type="text" name="nomor_sertifikat" value={formData.nomor_sertifikat} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>

                {/* Bagian Keterangan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                    <textarea name="keterangan" rows="2" value={formData.keterangan} onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>

                {/* Tombol Aksi */}
                <div className="pt-4 flex justify-end space-x-3">
                    <button type="button" onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Batal
                    </button>
                    <button type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                        Simpan Data KIB A
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormKIBA;