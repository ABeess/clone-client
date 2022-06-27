import app from 'src/utils/feathers';

export const cloudinaryUpload = async (data) => {
  const response = await app.service('upload').create(data);
  return response;
};
