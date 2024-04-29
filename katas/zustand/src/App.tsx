import { useEffect } from 'react';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import useDarkModeStore from './store/darkModeStore';
import { changeToDarkmodeAfter30Seconds } from './examples';

const App = () => {
  const { darkMode } = useDarkModeStore();
  // example js call 
  useEffect(() => {
   // changeToDarkmodeAfter30Seconds();
  })

  return (
    <div className={`flex flex-col items-center justify-center p-4 min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="mt-5 text-3xl font-bold justify-center underline mb-10">Todo List with Zustand</h1>
      <TodoList />
      <Calendar />
    </div>
  );
}

export default App;
