import React, { useState } from 'react';
import FileInput from "../Components/FileInput"; // Updated path
import StatusMessage from "../Components/StatusMessage";

const TrainModel = () => {
  const [file, setFile] = useState(null);
  const [showTrainingSection, setShowTrainingSection] = useState(false);
  const [reportDetails, setReportDetails] = useState(null);
  const [trainingStatus, setTrainingStatus] = useState('');
  const [modelData, setModelData] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && (uploadedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || uploadedFile.type === 'application/vnd.ms-excel')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        sessionStorage.setItem('uploadedFile', data);

        const report = {
          fileInfo: {
            name: uploadedFile.name,
            size: uploadedFile.size,
          },
          techniques: ['Naive Bayes Algorithm'],
        };
        sessionStorage.setItem('reportDetails', JSON.stringify(report));

        setFile(uploadedFile);
        setReportDetails(report);
        setShowTrainingSection(true);
      };
      reader.readAsBinaryString(uploadedFile);
    } else {
      alert('Please upload a valid Excel file.');
    }
  };

  const startTraining = () => {
    const uploadedFile = sessionStorage.getItem('uploadedFile');
    const report = JSON.parse(sessionStorage.getItem('reportDetails'));

    if (uploadedFile) {
      setTrainingStatus('Training model...');
      fetch('/train_model_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelType: report.techniques[0],
          fileData: uploadedFile,
          reportDetails: report,
        }),
      })
        .then(response => response.json())
        .then(data => {
          setTrainingStatus(`${report.techniques[0]} has been trained successfully!`);
          const modelData = {
            modelName: report.techniques[0],
            accuracy: data.accuracy,
          };
          setModelData(modelData);

          setTimeout(() => {
            // Simulate form submission or use other method to save the model
            const formData = new FormData();
            formData.append('modelName', modelData.modelName);
            formData.append('modelData', JSON.stringify(modelData));
            
            fetch('/save_model_form', {
              method: 'POST',
              body: formData,
            }).then(response => response.json())
              .then(() => console.log('Model saved successfully'))
              .catch(error => console.error('Error saving model:', error));
          }, 2000);
        })
        .catch(error => {
          console.error('Error:', error);
          setTrainingStatus('Training failed. Please try again.');
        });
    } else {
      alert('No file uploaded. Please upload an Excel file.');
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <NavBar />
      <section className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FileInput
              id="fileUpload"
              onChange={handleFileUpload}
              fileName={file ? file.name : ''}
              buttonText="Choose File"
            />
            {showTrainingSection && (
              <div id="startTrainingSection" className="mt-6">
                <p>Selected Model: Naive Bayes Algorithm</p>
                <div id="reportDetails" className="mb-4">
                  {reportDetails && (
                    <div>
                      <p>Report Details:</p>
                      <p>File Name: {reportDetails.fileInfo.name}</p>
                      <p>File Size: {formatBytes(reportDetails.fileInfo.size)}</p>
                      <p>Preprocessing Techniques: {reportDetails.techniques.join(', ')}</p>
                    </div>
                  )}
                </div>
                <button
                  id="startTrainingBtn"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  onClick={startTraining}
                >
                  Start Training
                </button>
                <StatusMessage message={trainingStatus} type={trainingStatus.includes('failed') ? 'error' : 'success'} />
              </div>
            )}
            {modelData && (
              <div id="modelData" className="mt-6">
                <p>Model Name: {modelData.modelName}</p>
                <p>Accuracy: {modelData.accuracy}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainModel;