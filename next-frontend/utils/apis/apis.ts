import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";
import { setCookie } from "cookies-next";
import { getTokenFromLocalStorage } from "@/utils/helpers";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api/v1";

const customAxios = axios.create({
  baseURL: baseURL,
});

customAxios.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (
  userInputs: TUserInputs,
  setUserInput: React.Dispatch<React.SetStateAction<TUserInputs>>,
  router: AppRouterInstance
) => {
  try {
    const response = await customAxios.post("/login", {
      name: userInputs.username,
      password: userInputs.password,
    });

    const { data } = response;
    const id = data?.user?.id;
    if (response.status === 200) {
      localStorage.setItem(ACCESS_TOKEN, data.refreshToken);
      setCookie(REFRESH_TOKEN, data.refreshToken, { maxAge: 60 * 60 * 24 });
      router.push(`/dashboard/${id}`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setUserInput({ username: "", password: "" });
  }
};

export const signup = async (
  userInputs: TUserInputs,
  setUserInput: React.Dispatch<React.SetStateAction<TUserInputs>>,
  router: AppRouterInstance
) => {
  try {
    const response = await customAxios.post("/signup", {
      name: userInputs.username,
      password: userInputs.password,
    });
    if (response.status === 201) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setUserInput({ username: "", password: "" });
  }
};

export const getTweets = async (
  id: string,
  setTweets: React.Dispatch<React.SetStateAction<Tweets[] | undefined>>
) => {
  try {
    const response = await customAxios.get(`/get-tweets/${id}`);
    const { data } = response;
    setTweets(data);
  } catch (error) {
    console.log(error);
  }
};
