import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:3002/api",
  //   withCredentials: true,
});

export const login = async (uid: string) => {
  const res = await api.post("/users/login", { uid });
  return res.data;
};
