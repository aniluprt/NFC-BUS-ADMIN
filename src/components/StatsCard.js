import React from 'react';

export default function StatsCard({ title, value, icon, color }) {
  return (
    <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        background: color || '#e3f2fd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px'
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#262626' }}>{value}</div>
        <div style={{ fontSize: '14px', color: '#8e8e8e' }}>{title}</div>
      </div>
    </div>
  );
}
