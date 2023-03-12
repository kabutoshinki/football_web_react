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

export async function getPlayers(currentPage) {
  return axios.get(apiEndpoint + `api/v1/home?page=${currentPage}`);
}
export async function searchPlayers(currentPage, name) {
  console.log(currentPage);
  console.log(name);
  return axios.get(apiEndpoint + `api/v1/home/search?page=${currentPage}&search=${name}`);
}
