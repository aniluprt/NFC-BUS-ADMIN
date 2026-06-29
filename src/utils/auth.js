export const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

export const getToken = () => localStorage.getItem('adminToken');

export const getUser = () => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

export const setAuth = (token, user) => {
  localStorage.setItem('adminToken', token);
  localStorage.setItem('adminUser', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};