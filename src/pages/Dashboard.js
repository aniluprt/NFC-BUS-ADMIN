import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { stats } from '../api/api';

export default function Dashboard() {
  const [data, setData] = useState({ users: 0, transactions: 0, revenue: 0, routes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await stats.getDashboard();
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
      // Set fallback data if API fails
      setData({
        users: 0,
        transactions: 0,
        revenue: 0,
        routes: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    { label: 'Total Users', value: data.users || 0, color: 'blue' },
    { label: 'Total Transactions', value: data.transactions || 0, color: 'green' },
    { label: 'Total Revenue (NPR)', value: `Rs ${(data.revenue || 0).toFixed(2)}`, color: 'yellow' },
    { label: 'Total Routes', value: data.routes || 0, color: 'red' },
  ];

  // Chart data
  const total = data.users + data.transactions + data.routes + (data.revenue / 100) || 1;
  const chartData = [
    { name: 'Users', value: data.users || 0, color: '#3b82f6', percentage: ((data.users / total) * 100) || 0 },
    { name: 'Transactions', value: data.transactions || 0, color: '#22c55e', percentage: ((data.transactions / total) * 100) || 0 },
    { name: 'Revenue', value: data.revenue || 0, color: '#eab308', percentage: (((data.revenue / 100) / total) * 100) || 0 },
    { name: 'Routes', value: data.routes || 0, color: '#ef4444', percentage: ((data.routes / total) * 100) || 0 },
  ];

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="stats-grid">
        {statsCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-number ${stat.color}`}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CSS Pie Chart Section */}
      <div style={{ 
        background: 'white', 
        border: '1px solid #dbdbdb', 
        borderRadius: '12px', 
        padding: '24px',
        marginTop: '20px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#262626', marginBottom: '20px', textAlign: 'center' }}>
          📊 Statistics Overview
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', alignItems: 'center' }}>
          {/* Pie Chart */}
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              {chartData.map((item, index) => {
                const offset = chartData.slice(0, index).reduce((acc, curr) => acc + curr.percentage, 0);
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="20"
                    strokeDasharray={`${item.percentage * 2.513} 251.3`}
                    strokeDashoffset={`-${offset * 2.513}`}
                    style={{ transition: 'stroke-dasharray 0.5s ease' }}
                  />
                );
              })}
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', color: '#8e8e8e' }}>Total</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#262626' }}>
                {data.users + data.transactions + data.routes}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chartData.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: item.color }}></div>
                <span style={{ fontSize: '14px', color: '#262626' }}>{item.name}</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#262626' }}>
                  {item.value.toLocaleString()}
                </span>
                <span style={{ fontSize: '12px', color: '#8e8e8e' }}>
                  ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}