import { writable } from "svelte/store";
import { browser } from "$app/environment";

const sessionValue = (name) => {
  let sessionName = browser ? sessionStorage.getItem(name) : "";
  return !!sessionName ? sessionName : "";
};

export const name = writable(sessionValue("userName") || "");
export const roomCode = writable();

class ModalType {
  isOpen = false;
  content = "";
  callback = () => {};

  constructor(isOpen, content, callback) {
    this.isOpen = isOpen;
    this.content = content;
    this.callback = callback;
  }
}

export const confirmState = writable(new ModalType());

export function openConfirm(content, callback = () => {}) {
  confirmState.set(
    new ModalType(true, content, () => {
      callback();
      closeConfirm();
    }),
  );
}

export function closeConfirm() {
  confirmState.set(new ModalType(false, "", closeConfirm));
}

export const modalState = writable(new ModalType());

export function openModal(content, callback = () => {}) {
  modalState.set(
    new ModalType(true, content, () => {
      callback();
      closeModal();
    }),
  );
}

export function closeModal() {
  modalState.set(new ModalType(false, "", closeModal));
}
