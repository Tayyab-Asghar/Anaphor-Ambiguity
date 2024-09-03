// src/components/FileDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FileDetailsPage = () => {
  const [fileDetails, setFileDetails] = useState({ name: '', size: 0, type: '' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const size = queryParams.get('size');
    const type = queryParams.get('type');

    if (name && size && type) {
      setFileDetails({
        name,
        size: parseInt(size),
        type
      });
    } else {
      setFileDetails({ name: 'No file details available', size: 0, type: '' });
    }
  }, [location.search]);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-lg font-semibold">
            Anaphoric <span className="text-gray-400">Ambiguity Detector</span>
          </a>
        </div>
      </nav>
      <section className="mt-8">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">File Details</h2>
          <div className="bg-gray-100 p-4 border border-gray-300 rounded">
            {fileDetails.name === 'No file details available' ? (
              fileDetails.name
            ) : (
              <>
                <p>Detailed File Information:</p>
                <p>Name: {fileDetails.name}</p>
                <p>Size: {formatBytes(fileDetails.size)}</p>
                <p>Type: {fileDetails.type}</p>
              </>
            )}
          </div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </section>
    </div>
  );
};

export default FileDetailsPage;
