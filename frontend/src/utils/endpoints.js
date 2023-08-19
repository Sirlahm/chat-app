import axios from 'axios'
let base_url;
if (import.meta.env.MODE === "development") {
  base_url = "http://localhost:5000/api/";
} else {
  base_url = "";
}
export const getUsers = () =>
  axios.get(`${base_url}user`).then((res) => res.data);

export const getUser = (id) =>
axios.get(`${base_url}user/${id}`).then((res) => res.data);

