import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { transactions } from '../api/api';

export default function Transactions() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await transactions.getAll();
      setList(response.data);
    } catch (error) {
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const filtered = list.filter(t =>
    t.description?.toLowerCase().includes(search.toLowerCase()) ||
    t.stop_name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h3>Transaction History</h3>
          <div className="actions">
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Stop</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.user_id}</td>
                  <td>
                    <span className={`status-badge ${t.type === 'tap_out' ? 'pending' : 'completed'}`}>
                      {t.type?.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ color: t.amount < 0 ? '#dc2626' : '#16a34a' }}>
                    {t.amount > 0 ? '+' : ''}{t.amount}
                  </td>
                  <td>{t.description || '-'}</td>
                  <td>{t.stop_name || '-'}</td>
                  <td>{new Date(t.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#8e8e8e' }}>
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
