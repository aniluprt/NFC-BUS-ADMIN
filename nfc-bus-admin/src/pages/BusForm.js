import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { buses } from '../api/api';

export default function BusForm({ bus, onClose, onSuccess }) {
  const [form, setForm] = useState({
    bus_number: bus?.bus_number || '',
    driver_name: bus?.driver_name || '',
    driver_phone: bus?.driver_phone || '',
    route_name: bus?.route_name || '',
    capacity: bus?.capacity || 40,
    status: bus?.status || 'active',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (bus) {
        await buses.update(bus._id, form);
        toast.success('Bus updated successfully');
      } else {
        await buses.create(form);
        toast.success('Bus added successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      const msg = error.response?.data?.error || 'Operation failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{bus ? ' Edit Bus' : ' Add New Bus'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Bus Number *</label>
            <input
              type="text"
              placeholder="e.g. BA 1 KHA 1234"
              value={form.bus_number}
              onChange={(e) => setForm({ ...form, bus_number: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Driver Name *</label>
            <input
              type="text"
              placeholder="Driver's full name"
              value={form.driver_name}
              onChange={(e) => setForm({ ...form, driver_name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Driver Phone</label>
            <input
              type="text"
              placeholder="Driver's phone number"
              value={form.driver_phone}
              onChange={(e) => setForm({ ...form, driver_phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Route Name *</label>
            <input
              type="text"
              placeholder="e.g. Bungamati – Ratnapark"
              value={form.route_name}
              onChange={(e) => setForm({ ...form, route_name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              placeholder="e.g. 40"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 40 })}
              min="10"
              max="100"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save" disabled={loading}>
              {loading ? 'Saving...' : bus ? 'Update Bus' : 'Add Bus'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}