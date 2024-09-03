import React, { useState, useEffect } from 'react';
import NavBar from "../Components/NavBar"; // Updated path
import StatusMessage from "../Components/StatusMessage";

const SaveModel = () => {
  const [fileName, setFileName] = useState('TrainedModelFile');
  const [accuracy, setAccuracy] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const modelName = urlParams.get('modelName');
    const modelData = urlParams.get('modelData');

    if (modelName && modelData) {
      // Parse model data
      const parsedModelData = JSON.parse(modelData);
      setFileName(modelName.replace(/\s+/g, '_'));
      if (parsedModelData.accuracy) {
        setAccuracy(parsedModelData.accuracy);
      }
    }
  }, []);

  const saveModel = () => {
    const trimmedFileName = fileName.trim() || 'trained_model';
    const modelDataToSave = {
      modelName: trimmedFileName,
      accuracy: accuracy
    };

    const jsonData = JSON.stringify(modelDataToSave);
    const blob = new Blob([jsonData], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trimmedFileName}.json`;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Display save message
    setSaveMessage(`Model "${trimmedFileName}" has been saved with an accuracy of ${accuracy}.`);
  };

  const changeFileName = () => {
    const newFileName = prompt('Enter new file name:', fileName);
    if (newFileName && newFileName.trim() !== '') {
      setFileName(newFileName.trim());
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <NavBar />
      <section className="w-full max-w-lg mx-auto my-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Save Model</h1>
        <div className="mb-6">
          <input
            type="text"
            id="fileNameInput"
            value={fileName}
            className="w-full p-2 border border-gray-300 rounded"
            readOnly
          />
          <div className="flex justify-between mt-4">
            <button
              id="changeNameBtn"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              onClick={changeFileName}
            >
              Change Name
            </button>
            <button
              id="saveModelBtn"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={saveModel}
            >
              Save Model
            </button>
          </div>
        </div>
        <StatusMessage message={saveMessage} type="success" />
      </section>
    </div>
  );
};

export default SaveModel;