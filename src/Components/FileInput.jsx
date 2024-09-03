import React from 'react';

const FileInput = ({ id, onChange, fileName, buttonText }) => (
  <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg">
    <input
      type="file"
      id={id}
      className="hidden"
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="block bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer mb-4 text-center"
    >
      {buttonText}
    </label>
    {fileName && (
      <div className="mb-4">
        <p>Selected File: {fileName}</p>
      </div>
    )}
  </div>
);

export default FileInput;
