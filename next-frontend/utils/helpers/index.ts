import { ACCESS_TOKEN } from "@/utils/constants";

export function getTokenFromLocalStorage() {
  if (typeof window != "undefined") {
    const token = localStorage?.getItem(ACCESS_TOKEN);
    return token || null;
  }
}
