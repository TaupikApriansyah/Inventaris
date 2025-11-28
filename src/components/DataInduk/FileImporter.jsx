// File: FileImporter.jsx
import React, { useRef } from 'react';

const FileImporter = ({ acceptedFileType, buttonLabel, icon, onFileUpload, customClassName }) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file, acceptedFileType);
            event.target.value = null; // Mereset input agar file yang sama bisa di-import lagi
        }
    };

    return (
        <div>
            {/* Input File Tersembunyi */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept={acceptedFileType} 
                onChange={handleFileChange}
            />

            {/* Tombol Pemicu Import */}
            <button
                onClick={handleButtonClick}
                // Menggunakan customClassName dari DataIndukContent untuk styling clean
                className={`flex items-center px-4 py-2.5 rounded-lg font-medium transition duration-200 text-sm ${customClassName}`}
            >
                <span className="mr-2 text-lg">{icon}</span>
                {buttonLabel}
            </button>
        </div>
    );
};

export default FileImporter;