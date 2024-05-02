import useDarkModeStore from "./store/darkModeStore";
import { useTodoStore } from "./store/todoStore";

export const changeToDarkmodeAfter30Seconds = () => {
  setTimeout(() => {
    useDarkModeStore.getState().toggleDarkMode();
    useTodoStore.setState();
  }, 3000);
};
