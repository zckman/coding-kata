// darkmode store
import { create } from 'zustand'
import { DarkModeState} from "../types/darkmodeTypes";

export const useDarkModeStore = create<DarkModeState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode }))
}))
