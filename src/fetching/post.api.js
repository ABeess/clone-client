import app from 'src/utils/feathers';

export const createPost = async (data) => {
  return await app.service('post').create(data);
};

export const getAllPost = ({ where }) => {
  return app.service('post').find({
    query: {
      ...where,
    },
  });
};
