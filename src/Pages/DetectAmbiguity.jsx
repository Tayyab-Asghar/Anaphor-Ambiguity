import React, { useState } from 'react';
import FileInput from "../Components/FileInput";

const DetectAmbiguity = () => {
  const [fileName, setFileName] = useState('');
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setShowUploadButton(true);
    } else {
      setFileName('');
      setShowUploadButton(false);
    }
  };

  const uploadFile = async () => {
    const file = document.getElementById('fileInput').files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/detect_ambiguity', {
          method: 'POST',
          body: formData,
        });

        const contentType = response.headers.get('content-type');
        const data = contentType && contentType.includes('application/json') 
          ? await response.json()
          : await response.text();

        if (Array.isArray(data)) {
          setResults(data);
        } else if (data.error) {
          setResults([{ Sentence: 'Error:', 'Predicted Ambiguity': data.error }]);
        } else {
          setResults([{ Sentence: 'Unexpected response format', 'Predicted Ambiguity': '' }]);
        }
      } catch (error) {
        setResults([{ Sentence: 'Error:', 'Predicted Ambiguity': error.message }]);
      }
    } else {
      setResults([{ Sentence: 'No file selected', 'Predicted Ambiguity': '' }]);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <NavBar />
      <section className="w-full max-w-4xl mx-auto my-8">
        <div className="text-center">
          <div className="text-3xl font-semibold mb-6">Detect Ambiguity</div>
          <form className="flex flex-col items-center">
            <FileInput
              id="fileInput"
              onChange={handleFileUpload}
              fileName={fileName}
              buttonText="Choose File"
            />
            {showUploadButton && (
              <button
                type="button"
                onClick={uploadFile}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Upload File
              </button>
            )}
          </form>
          {results && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Prediction Results</h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2">Sentence</th>
                    <th className="border-b px-4 py-2">Predicted Ambiguity</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b px-4 py-2">{item.Sentence}</td>
                      <td className="border-b px-4 py-2">{item['Predicted Ambiguity']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DetectAmbiguity;