import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css'; // We'll reuse the same styles

const IpoDetail = () => {
    const { state } = useLocation(); // Get the data passed from the dashboard
    const navigate = useNavigate();
    const ipo = state?.ipo;

    const [investment, setInvestment] = useState(15000); // Standard IPO lot size
    const [gmp, setGmp] = useState(50); // Grey Market Premium (Dummy default)

    if (!ipo) return <h2>No IPO Selected</h2>;

    // Simple Calculation Logic
    const estimatedProfit = (investment * (gmp / 100)).toFixed(0);
    const totalValue = parseInt(investment) + parseInt(estimatedProfit);

    return (
        <div className="App">
            <header className="header">
                <button onClick={() => navigate('/')} style={{float: 'left', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'}}>
                    ← Back
                </button>
                <h1>💰 Profit Calculator</h1>
                <p>{ipo.companyName}</p>
            </header>

            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <div className="card-body">
                    <div style={{ marginBottom: '20px' }}>
                        <label><strong>Investment Amount (₹):</strong></label>
                        <input 
                            type="number" 
                            value={investment} 
                            onChange={(e) => setInvestment(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label><strong>Expected Premium GMP (%):</strong></label>
                        <input 
                            type="number" 
                            value={gmp} 
                            onChange={(e) => setGmp(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                        <small className="text-gray-500">Current market expectation</small>
                    </div>

                    <hr />

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <h3>Estimated Profit: <span style={{ color: 'green' }}>₹{estimatedProfit}</span></h3>
                        <p>Total Listing Value: ₹{totalValue}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IpoDetail;