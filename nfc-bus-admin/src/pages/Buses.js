import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { buses } from '../api/api';
import BusForm from './BusForm';

export default function Buses() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      const response = await buses.getAll();
      setList(response.data || []);
    } catch (error) {
      toast.error('Failed to load buses');
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this bus?')) return;
    try {
      await buses.delete(id);
      toast.success('Bus deleted');
      loadBuses();
    } catch (error) {
      toast.error('Failed to delete bus');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'active',
      inactive: 'inactive',
      maintenance: 'pending',
    };
    return styles[status] || 'pending';
  };

  const filtered = list.filter(b =>
    b.bus_number?.toLowerCase().includes(search.toLowerCase()) ||
    b.driver_name?.toLowerCase().includes(search.toLowerCase()) ||
    b.route_name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading buses...</div>;
  }

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h3> All Buses</h3>
          <div className="actions">
            <input
              type="text"
              placeholder="Search by bus number, driver, or route..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="action-btn edit"
              style={{ padding: '8px 16px' }}
              onClick={() => { setEditing(null); setShowModal(true); }}
            >
              + Add Bus
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Bus Number</th>
                <th>Driver Name</th>
                <th>Driver Phone</th>
                <th>Route</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#8e8e8e' }}>
                    No buses found
                  </td>
                </tr>
              ) : (
                filtered.map((b, index) => (
                  <tr key={b._id || index}>
                    <td>{index + 1}</td>
                    <td><strong>{b.bus_number || '-'}</strong></td>
                    <td>{b.driver_name || '-'}</td>
                    <td>{b.driver_phone || '-'}</td>
                    <td>{b.route_name || '-'}</td>
                    <td>{b.capacity || 40}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(b.status)}`}>
                        {b.status || 'active'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-btn edit"
                        onClick={() => { setEditing(b); setShowModal(true); }}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(b._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <BusForm
          bus={editing}
          onClose={() => { setShowModal(false); setEditing(null); }}
          onSuccess={loadBuses}
        />
      )}
    </div>
  );
}