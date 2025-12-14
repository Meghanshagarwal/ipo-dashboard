import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import IpoDetail from './IpoDetail'; // Import the new page
import './App.css';

// We separate the "Dashboard" into its own component so navigation works
const Dashboard = () => {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIpos = async () => {
      try {
        const { data } = await axios.get('/api/ipos');
        setIpos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchIpos();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>🚀 IPO Dashboard</h1>
        <p>Live Market Data</p>
      </header>

      <main>
        {loading ? <h2>Loading...</h2> : (
          <div className="grid">
            {ipos.map((ipo) => (
              // On Click, we go to /calculator and pass the IPO data
              <div 
                key={ipo._id} 
                className="card" 
                onClick={() => navigate('/calculator', { state: { ipo } })}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-header">
                  <h3>{ipo.companyName}</h3>
                  <span className={`status ${ipo.status.toLowerCase()}`}>{ipo.status}</span>
                </div>
                <div className="card-body">
                  <p><strong>Price:</strong> {ipo.priceBand}</p>
                  <p><strong>Date:</strong> {new Date(ipo.openDate).toLocaleDateString()}</p>
                  <p style={{ marginTop: '10px', color: '#2563eb', fontWeight: 'bold' }}>
                     Click to Calculate ➔
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/calculator" element={<IpoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;