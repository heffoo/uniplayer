import axios from "./axios";

interface LoginParams {
  username: string;
  password: string;
}

export async function loginUser(params: LoginParams) {
  const data = await axios.post("/signin", {
    username: params.username,
    password: params.password,
  });
  return data;
}

export async function registerUser(params: LoginParams) {
  const data = await axios.post("/registration", {
    username: params.username,
    password: params.password,
  });
  return data;
}

export async function me() {
  const data = await axios.get("/users/me");
  return data;
}
