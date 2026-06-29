import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { routes } from '../api/api';
import RouteForm from './RouteForm';

export default function Routes() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const response = await routes.getAll();
      setList(response.data);
    } catch (error) {
      toast.error('Failed to load routes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this route?')) return;
    try {
      await routes.delete(id);
      toast.success('Route deleted');
      loadRoutes();
    } catch (error) {
      toast.error('Failed to delete route');
    }
  };

  const filtered = list.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.from_stop?.toLowerCase().includes(search.toLowerCase()) ||
    r.to_stop?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h3>Bus Routes</h3>
          <div className="actions">
            <input
              type="text"
              placeholder="Search routes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="action-btn edit"
              style={{ padding: '8px 16px' }}
              onClick={() => { setEditing(null); setShowModal(true); }}
            >
              + Add Route
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Route Name</th>
                <th>From</th>
                <th>To</th>
                <th>Price (Rs)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.from_stop}</td>
                  <td>{r.to_stop}</td>
                  <td>Rs {r.price}</td>
                  <td>
                    <button
                      className="action-btn edit"
                      onClick={() => { setEditing(r); setShowModal(true); }}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#8e8e8e' }}>
                    No routes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <RouteForm
          route={editing}
          onClose={() => { setShowModal(false); setEditing(null); }}
          onSuccess={loadRoutes}
        />
      )}
    </div>
  );
}