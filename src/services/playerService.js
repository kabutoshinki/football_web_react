import config from "../config.json";
import axios from "axios";

const apiEndpoint = config.apiEndpoint;
// console.log("Api: " + apiEndpoint);
// let accessToken = localStorage.getItem("Access-Token");
// // Đặt quyền truy cập vào api
// const options = {
//   headers: {
//     Authorization: "Bearer " + accessToken,
//   },
// };

export async function getPlayers() {
  return axios.get(apiEndpoint + `api/v1/players`);
}
export async function getPlayerById(id) {
  return axios.get(apiEndpoint + `api/v1/players/${id}`);
}

export async function addPlayer(formData) {
  return await axios.post(apiEndpoint + `api/v1/players`, formData);
}

export async function updatePlayer(formData) {
  return await axios.put(apiEndpoint + `api/v1/players/update`, formData);
}

export async function deletePlayer(id) {
  return axios.delete(apiEndpoint + `api/v1/players/delete/${id}`);
}
