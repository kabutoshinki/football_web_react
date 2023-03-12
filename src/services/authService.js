import config from "../config.json";
import axios from "axios";
import jwtDecode from "jwt-decode";
const apiEndpoint = config.apiEndpoint;
// console.log("Api: " + apiEndpoint);
// let accessToken = localStorage.getItem("Access-Token");
// // Đặt quyền truy cập vào api

export async function login(formData) {
  return axios.post(apiEndpoint + `api/v1/auth/login`, formData);
}
export async function register(formData) {
  return axios.post(apiEndpoint + `api/v1/auth/register`, formData);
}
export async function logout() {
  return axios.get(apiEndpoint + `api/v1/auth/logout`);
}

export async function getProfile(id) {
  return axios.get(apiEndpoint + `api/v1/auth/profile/${id}`);
}
export async function editProfile(formData) {
  return axios.post(apiEndpoint + `api/v1/auth/updateProfile`, formData);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("accessToken");
    const user = jwtDecode(token);
    console.log(user);
    return user;
  } catch (error) {
    return null;
  }
}
