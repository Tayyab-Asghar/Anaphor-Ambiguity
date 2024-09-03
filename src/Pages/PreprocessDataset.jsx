import React, { useState } from 'react';
import FileInput from "../Components/FileInput"; // Updated path
import StatusMessage from "../Components/StatusMessage"; // Updated path

const PreprocessDataset = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(''); // Clear previous status
    } else {
      setSelectedFile(null);
      setUploadStatus('');
    }
  };

  const uploadFile = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      setUploadStatus('Uploading...');

      fetch('/preprocess_dataset', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            sessionStorage.setItem('fileInfo', JSON.stringify({ name: selectedFile.name, size: selectedFile.size }));
            window.location.href = '/file_info';
          } else if (data.error) {
            setUploadStatus(`Error: ${data.error}`);
          }
        })
        .catch(error => {
          setUploadStatus(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <NavBar />
      <section className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">PreProcess DataSet</h1>
            <p className="mb-4">Upload dataset with file chooser or by dragging and dropping file onto the dashed region</p>
            <FileInput
              id="fileInput"
              onChange={handleFileUpload}
              fileName={selectedFile ? selectedFile.name : ''}
              buttonText="Choose File"
            />
            {selectedFile && (
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={uploadFile}
              >
                Upload File
              </button>
            )}
            <StatusMessage message={uploadStatus} type={uploadStatus.includes('Error') ? 'error' : 'success'} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreprocessDataset;