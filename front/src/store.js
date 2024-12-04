import { writable } from "svelte/store";
import { browser } from "$app/environment";

const sessionValue = (name) => {
  let sessionName = browser ? sessionStorage.getItem(name) : "";
  return !!sessionName ? sessionName : "";
};

export const name = writable(sessionValue("userName") || "");
export const roomCode = writable();

export const confirmState = writable({
  isOpen: false,
  content: "",
  callback: closeConfirm,
});

export function openConfirm(content, callback = () => {}) {
  confirmState.set({ isOpen: true, content, callback });
}

export function closeConfirm() {
  confirmState.set({
    isOpen: false,
    content: "",
    callback: closeConfirm,
  });
}

export const modalState = writable({
  isOpen: false,
  content: "",
  callback: closeModal,
});

export function openModal(content, callback = closeModal) {
  modalState.set({ isOpen: true, content, callback });
}

export function closeModal() {
  modalState.set({
    isOpen: false,
    content: "",
    callback: closeModal,
  });
}
