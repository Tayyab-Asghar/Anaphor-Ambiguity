// src/components/ViewFilePage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ViewFilePage = () => {
  const { filename } = useParams();
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    // Simulate fetching file content; replace with your actual data fetching logic
    // Example: fetch(`/api/files/${filename}`).then(res => res.text()).then(setFileContent);
    const fetchFileContent = async () => {
      try {
        const response = await fetch(`/api/files/${filename}`);
        const content = await response.text();
        setFileContent(content);
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
    };

    fetchFileContent();
  }, [filename]);

  return (
    <div className="container mx-auto p-4">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-lg font-semibold">Anaphoric <span className="text-gray-400">Ambiguity Detector</span></a>
        </div>
      </nav>
      <section className="mt-8">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Viewing File: {filename}</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 border border-gray-300 rounded">
            {fileContent}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ViewFilePage;
