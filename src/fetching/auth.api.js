import app from 'src/utils/feathers';

export const login = (data) => {
  return app.authenticate({
    strategy: 'local',
    ...data,
  });
};
export const register = ({ data, checking }) => {
  return app.service('users').create(data, {
    query: { checking },
  });
};
export const getFromLocation = (location) => {
  return app.authentication.getFromLocation(location);
};
export const refreshToken = ({ data, logout }) => {
  return app.service('refresh-token').create(data, {
    query: { logout },
  });
};
export const removeRefreshToken = (userId) => {
  return app.service('refresh-token').remove(null, {
    query: { userId, logout: true },
  });
};
export const reAuthenticate = () => {
  return app.authentication.reAuthenticate();
};
export const logout = () => {
  return app.logout();
};
