import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../Components/NavBar";

const MainPage = () => (
  <div className="relative">
    <div className="fixed bottom-4 right-4 z-50">
      <button className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600">
        <i className="fas fa-angle-up"></i>
      </button>
    </div>
    <NavBar />
    <section className="bg-gray-100 py-12" id="home">
      <div className="container mx-auto text-center">
        <div className="space-y-4">
          <Link to="/preprocess_dataset" className="text-blue-500 text-xl font-semibold hover:underline">PreProcess DataSet</Link>
          <Link to="/train_model" className="text-blue-500 text-xl font-semibold hover:underline">Train ML Model</Link>
          <Link to="/save_model_form" className="text-blue-500 text-xl font-semibold hover:underline">Save Model</Link>
          <Link to="/detect_ambiguity" className="text-blue-500 text-xl font-semibold hover:underline">Detect Ambiguity</Link>
        </div>
      </div>
    </section>
  </div>
);

export default MainPage;