import { writable } from 'svelte/store';

export const json = writable({});
export const showPopup = writable(false);
export const popupInput = writable({
  options: null,
  value: null,
  variable: null,
  update: () => void 0,
});
