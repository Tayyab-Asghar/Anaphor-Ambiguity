import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../Components/NavBar";

const HomePage = () => (
  <div>
    <NavBar />
    <section className="bg-gray-100 h-screen flex items-center justify-center" id="home">
      <div className="text-center max-w-xl mx-auto">
        <div className="text-3xl font-bold mb-4">Anaphoric Ambiguity Detector</div>
        <div className="text-xl text-gray-600 mb-6">Your Gateway to Clarity</div>
        <Link to="/main" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Start
        </Link>
      </div>
    </section>
  </div>
);

export default HomePage;