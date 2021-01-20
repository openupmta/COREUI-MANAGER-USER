import http from "../../http-common";

const getAll = () => {
  return http.get("/users");
};

const get = id => {
  return http.get(`/users/${id}`);
};

const create = user => {
  return http.post("/users", user);
};

const update = (id, user) => {
  return http.put(`/users/${id}`, user);
};
const getAllSearch = (filter, role, status, pageNumber, pageSize) => {
  return http.get(`/users/search?filter=${filter}&role=${role}&status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
};
const getById = id => {
  return http.get(`/users/${id}`);
};
const remove = id => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

// const findByTitle = title => {
//   return http.get(`/user?title=${title}`);
// };
const findByTitle = () => {
  return http.get("/users");
};
export default {
  getAll,
  getAllSearch,
  getById,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
