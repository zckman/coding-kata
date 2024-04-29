import useDarkModeStore from "./store/darkModeStore";

export const changeToDarkmodeAfter30Seconds = () => {
    setTimeout(() => {
        useDarkModeStore.getState().toggleDarkMode();
    }, 3000);
}