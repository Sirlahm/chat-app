import axios from "axios";
let base_url;
if (import.meta.env.MODE === "development") {
  base_url = "http://localhost:5000/api/";
} else {
  base_url = "";
}
export const getUsers = () =>
  axios.get(`${base_url}user`,{
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`}
    }).then((res) => res.data);

export const getUser = (id) =>
  axios.get(`${base_url}user/${id}`,{
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    }
  }).then((res) => res.data.getaUser);

  export const getMessages = (senderId,receiverId) =>
  axios.get(`${base_url}user/messages/${senderId}/${receiverId}`,{
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`}
    }).then((res) => res.data);

export const login = (emailOrUsername, password) =>
  axios
    .post(`${base_url}auth/login`, { emailOrUsername, password })
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data));
      res.data
    });

export const signup = (data) =>
  axios
    .post(`${base_url}auth/signup`, { ...data })
    .then((res) => res.data);
