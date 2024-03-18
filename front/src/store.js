import { writable } from "svelte/store";
import { browser } from "$app/environment";

const sessionValue = (name) => {
  let sessionName = browser ? sessionStorage.getItem(name) : "";
  return !!sessionName ? sessionName : "";
};

export const name = writable(sessionValue("userName") || "");
