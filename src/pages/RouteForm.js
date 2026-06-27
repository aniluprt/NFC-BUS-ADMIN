import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { routes } from '../api/api';

export default function RouteForm({ route, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: route?.name || '',
    from_stop: route?.from_stop || '',
    to_stop: route?.to_stop || '',
    price: route?.price || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (route) {
        await routes.update(route.id, form);
        toast.success('Route updated');
      } else {
        await routes.create(form);
        toast.success('Route created');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{route ? 'Edit Route' : 'Add New Route'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Route Name</label>
            <input
              type="text"
              placeholder="e.g. Bungamati – Ratnapark"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>From Stop</label>
            <input
              type="text"
              placeholder="Starting stop"
              value={form.from_stop}
              onChange={(e) => setForm({ ...form, from_stop: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>To Stop</label>
            <input
              type="text"
              placeholder="Ending stop"
              value={form.to_stop}
              onChange={(e) => setForm({ ...form, to_stop: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Price (Rs)</label>
            <input
              type="number"
              placeholder="e.g. 25"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
              min="1"
              step="1"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save" disabled={loading}>
              {loading ? 'Saving...' : route ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}