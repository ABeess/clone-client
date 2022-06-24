import app from 'src/utils/feathers';

export const getFromLocation = (location) => {
  return app.authentication.getFromLocation(location);
};
export const refreshToken = ({ data, logout }) => {
  return app.service('refresh-token').create(data, {
    query: { logout },
  });
};
export const reAuthenticate = () => {
  return app.authentication.reAuthenticate();
};
