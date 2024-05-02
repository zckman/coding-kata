# Practice session one
Start by understanding how Zustand works.
When you're ready we want to add a darkmode switcher to the App.
I've hardcoded the darkmode boolean value to false, but the idea with the switcher is, tht you can dynamically toggle it everywhere.

1. Add the necessary states for the darkmode in the src/store/darkModeStore.ts
2. Feel free to use the defined type in src/types/darkModeStore.ts
3. Now import the global state in all the components where the value is hard coded
4. Finally also import the state and use the toggle in the src/components/DarkModeToggle.tsx

You should now be able to use the toggle in all files and the state should update everywhere!