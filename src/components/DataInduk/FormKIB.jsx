// src/components/DataInduk/FormKIB.jsx

import React, { useState, useMemo } from 'react';
import { PRIMARY_COLOR } from '../constants';

// --- BAGIAN 1: KONFIGURASI FIELD UNTUK SETIAP JENIS KIB ---

const KIB_FIELDS = {
    // 🟩 KIB A – TANAH
    'A': {
        jenis_label: 'KIB A – Tanah',
        default_sub_jenis: 'Tanah',
        fields: [
            { label: 'Kode Barang', name: 'kode_barang', type: 'text', required: true, placeholder: 'Contoh: 1.01.01.01.001' },
            { label: 'Nama Barang', name: 'nama_barang', type: 'text', required: true, placeholder: 'Contoh: Tanah Kantor Utama' },
            { label: 'NIB / Nomor Register', name: 'nomor_register', type: 'text', required: false },
            { label: 'Letak / Alamat Tanah', name: 'lokasi', type: 'textarea', required: true },
            { label: 'Luas Tanah (m²)', name: 'luas_tanah', type: 'number', required: true, min: 0 },
            { label: 'Penggunaan Tanah', name: 'penggunaan_tanah', type: 'text', placeholder: 'Contoh: Kantor/Taman' },
            { label: 'Status Tanah', name: 'status_tanah', type: 'select', required: true, options: ['Hak Milik', 'Hak Pakai', 'Hak Guna Bangunan', 'Lainnya'] },
            { label: 'Nomor Sertifikat', name: 'nomor_sertifikat', type: 'text' },
            { label: 'Tanggal Sertifikat', name: 'tanggal_sertifikat', type: 'date' },
            { label: 'Atas Nama Sertifikat', name: 'atas_nama_sertifikat', type: 'text' },
            { label: 'Asal-usul Perolehan', name: 'cara_perolehan', type: 'select', required: true, options: ['Pembelian', 'Hibah', 'Lainnya'] },
            { label: 'Tahun Perolehan', name: 'tahun_perolehan', type: 'number', required: true, min: 1900, max: new Date().getFullYear(), placeholder: new Date().getFullYear() },
            { label: 'Harga Perolehan (Rp)', name: 'nilai_perolehan', type: 'number', required: true, min: 0, placeholder: 'Tanpa titik/koma. Contoh: 500000000' },
            { label: 'Keterangan', name: 'keterangan', type: 'textarea' },
        ],
    },

    // 🟦 KIB B – PERALATAN & MESIN (Paling mendekati form awal, dijadikan standar jika tidak dipilih)
    'B': {
        jenis_label: 'KIB B – Peralatan & Mesin',
        default_sub_jenis: 'Peralatan/Mesin',
        fields: [
            { label: 'Kode Barang', name: 'kode_barang', type: 'text', required: true, placeholder: 'Contoh: 1.03.01.02.001' },
            { label: 'Nama Barang', name: 'nama_barang', type: 'text', required: true, placeholder: 'Contoh: Laptop Kerja Staf' },
            { label: 'Nomor Register', name: 'nomor_register', type: 'text', required: false, placeholder: 'Contoh: 005/A' },
            { label: 'Merk / Tipe', name: 'merek_tipe', type: 'text' },
            { label: 'Ukuran / CC', name: 'ukuran_cc', type: 'text', placeholder: 'Contoh: 150cc / 14-inch' },
            { label: 'Bahan', name: 'bahan', type: 'text', placeholder: 'Contoh: Metal, Plastik' },
            { label: 'Tahun Perolehan', name: 'tahun_perolehan', type: 'number', required: true, min: 1900, max: new Date().getFullYear() },
            { label: 'Nomor Pabrik', name: 'nomor_pabrik', type: 'text' },
            { label: 'Asal-usul Perolehan', name: 'cara_perolehan', type: 'select', required: true, options: ['Pembelian', 'Hibah', 'Lainnya'] },
            { label: 'Jumlah', name: 'jumlah', type: 'number', required: true, min: 1 },
            { label: 'Harga Perolehan (Rp)', name: 'nilai_perolehan', type: 'number', required: true, min: 0, placeholder: 'Contoh: 12000000' },
            { label: 'Kondisi Barang', name: 'kondisi', type: 'select', required: true, options: ['Baik', 'Kurang Baik', 'Rusak Berat'] },
            { label: 'Lokasi / Ruangan', name: 'lokasi', type: 'text', placeholder: 'Contoh: Ruang Meeting A' },
            // Detail Kendaraan (Tambahan, untuk mengakomodir motor/mobil dinas)
            { label: 'Nomor Polisi', name: 'nomor_polisi', type: 'text', grid_col: 1 },
            { label: 'Nomor Rangka', name: 'nomor_rangka', type: 'text', grid_col: 1 },
            { label: 'Nomor Mesin', name: 'nomor_mesin', type: 'text', grid_col: 1 },
            { label: 'Keterangan', name: 'keterangan', type: 'textarea', grid_col: 2 },
        ],
    },

    // 🟧 KIB C – GEDUNG & BANGUNAN
    'C': {
        jenis_label: 'KIB C – Gedung & Bangunan',
        default_sub_jenis: 'Gedung/Bangunan',
        fields: [
            { label: 'Kode Barang', name: 'kode_barang', type: 'text', required: true, placeholder: 'Contoh: 1.02.01.01.001' },
            { label: 'Nama Gedung/Bangunan', name: 'nama_barang', type: 'text', required: true, placeholder: 'Contoh: Gedung Kantor Utama' },
            { label: 'Nomor Register', name: 'nomor_register', type: 'text', required: false },
            { label: 'Letak / Alamat Gedung', name: 'lokasi', type: 'textarea', required: true },
            { label: 'Luas Lantai (m²)', name: 'luas_lantai', type: 'number', required: true, min: 0 },
            { label: 'Jumlah Lantai', name: 'jumlah_lantai', type: 'number', required: true, min: 1 },
            { label: 'Tahun Perolehan', name: 'tahun_perolehan', type: 'number', required: true, min: 1900, max: new Date().getFullYear() },
            { label: 'Asal Perolehan', name: 'cara_perolehan', type: 'select', required: true, options: ['Pembangunan Sendiri', 'Pembelian', 'Hibah', 'Lainnya'] },
            { label: 'Harga Perolehan (Rp)', name: 'nilai_perolehan', type: 'number', required: true, min: 0, placeholder: 'Contoh: 1500000000' },
            { label: 'Kondisi Bangunan', name: 'kondisi', type: 'select', required: true, options: ['Baik', 'Kurang Baik', 'Rusak Berat'] },
            { label: 'Konstruksi Bangunan', name: 'konstruksi', type: 'select', required: true, options: ['Baja', 'Beton', 'Semi Permanen', 'Lainnya'] },
            { label: 'Status Tanah', name: 'status_tanah', type: 'select', required: true, options: ['Milik Pemerintah', 'Milik Mandiri', 'Sewa', 'Lainnya'] },
            { label: 'Dokumen Kepemilikan', name: 'jenis_dokumen', type: 'select', options: ['IMB', 'Sertifikat', 'Lainnya'] },
            { label: 'No. Dokumen', name: 'nomor_dokumen', type: 'text' },
            { label: 'Tanggal Dokumen', name: 'tanggal_dokumen', type: 'date' },
            { label: 'Keterangan', name: 'keterangan', type: 'textarea', grid_col: 2 },
        ],
    },
};

// --- BAGIAN 2: KOMPONEN UTAMA FormKIB ---

const FormKIB = ({ onSave, onCancel, initialKibType = 'B' }) => {
    // State untuk jenis KIB yang dipilih
    const [kibType, setKibType] = useState(initialKibType);

    // Dapatkan konfigurasi field berdasarkan kibType yang dipilih
    const config = KIB_FIELDS[kibType];

    // Menggunakan useMemo untuk inisialisasi state awal (reset jika kibType berubah)
    const initialFormData = useMemo(() => {
        // Mengambil semua field dari semua KIB untuk memastikan semua key ada (walau nilai default mungkin undefined)
        const allFields = [...KIB_FIELDS.A.fields, ...KIB_FIELDS.B.fields, ...KIB_FIELDS.C.fields];
        const base = allFields.reduce((acc, field) => {
            acc[field.name] = ''; // Inisialisasi default kosong
            return acc;
        }, {});

        // Menggabungkan dengan nilai default yang spesifik
        return {
            ...base,
            // Nilai default yang konsisten
            jenis: `KIB ${kibType}`,
            jumlah: 1,
            nilai_perolehan: 0,
            tanggal_perolehan: new Date().toISOString().substring(0, 10),
            kondisi: 'Baik',
            cara_perolehan: 'Pembelian',
            sub_jenis: config.default_sub_jenis,

            // Reset field spesifik KIB untuk KIB B:
            lokasi: kibType === 'B' ? 'Kantor Utama' : base.lokasi,
            
        };
    }, [kibType, config.default_sub_jenis]);

    // State form data
    const [formData, setFormData] = useState(initialFormData);

    // Reset formData saat kibType berubah
    React.useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validasi minimal
        if (!formData.kode_barang || !formData.nama_barang || !formData.nilai_perolehan) {
            alert("Harap isi Kode Barang, Nama Barang, dan Harga Perolehan.");
            return;
        }

        // 2. Validasi field yang wajib diisi berdasarkan config KIB saat ini
        const requiredFields = config.fields.filter(f => f.required).map(f => f.name);
        for (const fieldName of requiredFields) {
            if (!formData[fieldName]) {
                alert(`Field wajib: ${config.fields.find(f => f.name === fieldName).label} harus diisi.`);
                return;
            }
        }

        // 3. Persiapan Data (Konversi Numerik dan Pembersihan Format)
        const numericValue = Number(String(formData.nilai_perolehan).replace(/[^0-9]/g, ''));
        const numericJumlah = Number(formData.jumlah);

        if (isNaN(numericValue) || numericValue < 0 || isNaN(numericJumlah) || numericJumlah < 0) {
            alert("Nilai Perolehan dan Jumlah harus berupa angka positif.");
            return;
        }

        // Filter data, hanya menyertakan field yang ada di config saat ini dan field dasar
        const allowedKeys = [...config.fields.map(f => f.name), 'jenis', 'sub_jenis', 'jumlah'];
        const itemToSave = Object.keys(formData)
            .filter(key => allowedKeys.includes(key))
            .reduce((obj, key) => {
                obj[key] = formData[key];
                return obj;
            }, {});

        // Overwrite nilai numerik yang sudah diproses
        itemToSave.nilai_perolehan = numericValue;
        itemToSave.jumlah = numericJumlah;
        
        // 4. Panggil fungsi onSave
        onSave(itemToSave);
    };

    // --- BAGIAN 3: RENDERING FORM ---
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto my-8">
            <h2 className={`text-2xl font-bold mb-6 text-${PRIMARY_COLOR}-600`}>
                ➕ Formulir Tambah Data Aset {config.jenis_label}
            </h2>
            
            <div className="mb-6">
                <label className="text-base font-medium text-gray-700 block mb-2">Pilih Jenis KIB:</label>
                <div className="flex space-x-4">
                    <button 
                        type="button" 
                        onClick={() => setKibType('A')}
                        className={`px-4 py-2 rounded-lg font-medium transition duration-150 ${kibType === 'A' ? `bg-green-600 text-white` : 'bg-gray-200 text-gray-700 hover:bg-green-100'}`}
                    >
                        KIB A (Tanah)
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setKibType('B')}
                        className={`px-4 py-2 rounded-lg font-medium transition duration-150 ${kibType === 'B' ? `bg-blue-600 text-white` : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}`}
                    >
                        KIB B (Peralatan & Mesin)
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setKibType('C')}
                        className={`px-4 py-2 rounded-lg font-medium transition duration-150 ${kibType === 'C' ? `bg-orange-600 text-white` : 'bg-gray-200 text-gray-700 hover:bg-orange-100'}`}
                    >
                        KIB C (Gedung & Bangunan)
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {config.fields.map((field) => (
                        // Menggunakan grid_col untuk mengatur span kolom (misal: untuk textarea di KIB B/C)
                        <div key={field.name} className={`flex flex-col ${field.grid_col === 2 ? 'md:col-span-2' : ''}`}>
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>

                            {/* Logika Rendering Input */}
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name] || (field.options[0] || '')} // Menggunakan default option pertama
                                    onChange={handleChange}
                                    required={field.required}
                                    className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="" disabled hidden={!field.required}>Pilih {field.label}</option>
                                    {field.options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    rows="3"
                                    required={field.required}
                                    className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder={field.placeholder}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required={field.required}
                                    min={field.min}
                                    max={field.max}
                                    className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder={field.placeholder}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 font-medium"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className={`px-6 py-2 bg-${PRIMARY_COLOR}-600 text-white rounded-lg hover:bg-${PRIMARY_COLOR}-700 transition duration-150 font-medium shadow-md`}
                    >
                        Simpan Data Aset {kibType}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormKIB;