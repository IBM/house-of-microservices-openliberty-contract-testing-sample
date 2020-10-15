import React from 'react';
import House from './House';
import ResidentTable from './ResidentTable';

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
