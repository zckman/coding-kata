// store.js
import {create} from 'zustand'
import { DarkModeState } from '../types/darkmodeTypes';

const useDarkModeStore = create<DarkModeState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode }))
}))

export default useDarkModeStore;
