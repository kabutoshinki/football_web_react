import config from "../config.json";
import axios from "axios";

const apiEndpoint = config.apiEndpoint;

export async function getNations() {
  return axios.get(apiEndpoint + `api/v1/nations`);
}

export async function addNation(formData) {
  return await axios.post(apiEndpoint + `api/v1/nations`, formData);
}

export async function updateNation(formData) {
  return await axios.post(apiEndpoint + `api/v1/nations/update`, formData);
}

export async function deleteNation(id) {
  return await axios.delete(apiEndpoint + `api/v1/nations/delete/${id}`);
}
