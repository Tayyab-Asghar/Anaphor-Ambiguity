// src/components/ModelDetails.jsx
import React, { useState, useEffect } from 'react';

const ModelDetails = () => {
  const [modelData, setModelData] = useState({
    preprocessData: {},
    trainedModelData: {}
  });

  useEffect(() => {
    // Fetch model data from an API or a context (for example purposes)
    // Adjust the endpoint or method to fetch your model data
    fetch('/api/model-details') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setModelData({
          preprocessData: data.preprocessData,
          trainedModelData: data.trainedModelData
        });
      })
      .catch(error => console.error('Error fetching model data:', error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">Anaphoric <span>Ambiguity Detector</span></a>
        </div>
      </nav>
      <section className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-6 text-center">Model Details</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Preprocess Data</h3>
              <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(modelData.preprocessData, null, 2)}</pre>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Trained Model Data</h3>
              <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(modelData.trainedModelData, null, 2)}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelDetails;
