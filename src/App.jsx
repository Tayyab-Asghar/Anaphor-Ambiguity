import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css'; // Ensure your index.css includes Tailwind and other imports
import HomePage from './Pages/HomePage';
import MainPage from './Pages/MainPage';
import PreprocessDataset from './Pages/PreprocessDataset';
import TrainModel from './Pages/TrainModel';
import SaveModel from './Pages/SaveModel';
import DetectAmbiguity from './Pages/DetectAmbiguity';
import FileDetailsPage from './Pages/FileDetailsPage';
import backgroundImage from './assets/Images/Background_img_Home.jpg';

const App = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100%',
  };

  return (
    <Router>
      <div style={backgroundStyle}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/preprocess_dataset" element={<PreprocessDataset />} />
          <Route path="/train_model" element={<TrainModel />} />
          <Route path="/save_model_form" element={<SaveModel />} />
          <Route path="/detect_ambiguity" element={<DetectAmbiguity />} />
          <Route path="/file_info" element={<FileDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;