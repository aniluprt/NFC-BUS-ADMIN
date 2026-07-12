import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { users } from '../api/api';

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await users.getAll();
      setUserList(response.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (id) => {
    if (!window.confirm('Block this user?')) return;
    try {
      await users.block(id);
      toast.success('User blocked');
      loadUsers();
    } catch (error) {
      toast.error('Failed to block user');
    }
  };

  const handleUnblock = async (id) => {
    if (!window.confirm('Unblock this user?')) return;
    try {
      await users.unblock(id);
      toast.success('User unblocked');
      loadUsers();
    } catch (error) {
      toast.error('Failed to unblock user');
    }
  };

  const filtered = userList.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;

  return (
    <div>
      <div className="table-container">
        <div className="table-header">
          <h3>All Users</h3>
          <div className="actions">
            <input
              type="text"
              placeholder="Search users..."
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || '-'}</td>
                  <td>Rs {user.balance?.toFixed(2) || '0.00'}</td>
                  <td>
                    <span className={`status-badge ${user.card_blocked ? 'inactive' : 'active'}`}>
                      {user.card_blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td>
                    {user.card_blocked ? (
                      <button className="action-btn edit" onClick={() => handleUnblock(user.id)}>
                        Unblock
                      </button>
                    ) : (
                      <button className="action-btn delete" onClick={() => handleBlock(user.id)}>
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#8e8e8e' }}>
                    No users found
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