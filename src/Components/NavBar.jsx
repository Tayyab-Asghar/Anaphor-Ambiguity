import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="bg-blue-500 p-4 text-white">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Anaphoric <span>Ambiguity Detector</span></Link>
    </div>
  </nav>
);

export default NavBar;
