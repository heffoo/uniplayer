import axios from "axios";

const instance = axios.create({
  baseURL: "http://uniplayer.local:3000",
//   withCredentials: true,
});

export * from "axios";
export default instance;
