import axios from "axios";
import { redirect } from "next/navigation";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api/v1";

const customAxios = axios.create({
  baseURL: baseURL,
});
// const token = "asdf";

// customAxios.interceptors.request.use((config) => {
//   config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// });

export const login = async (userInputs: TUserInputs) => {
  try {
    const response = await customAxios.post("/login", {
      username: userInputs.username,
      password: userInputs.password,
    });

    if (response.status === 200) {
      redirect("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (userInputs: TUserInputs) => {
  try {
    const response = await customAxios.post("/login", {
      username: userInputs.username,
      password: userInputs.password,
    });

    if (response.status === 200) {
      redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTweets = async () => {
  try {
    const response = await customAxios.post("/get-tweets");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
