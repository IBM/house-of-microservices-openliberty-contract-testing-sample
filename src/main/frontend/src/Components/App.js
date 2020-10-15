import React from 'react';
import House from './House';
import ResidentTable from './ResidentTable';

import axios from 'axios';
// Set where we find our backend
axios.defaults.baseURL = 'http://localhost:9080';

function App() {
  return (
    <div>
      <h2>House Web Service</h2>
      <div className="page">
        <House />
        <ResidentTable />
      </div>
    </div>
  );
}

export default App;
