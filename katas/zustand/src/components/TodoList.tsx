import { FC, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

const TodoList: FC = () => {
  const [todoValue, setTodoValue] = useState("");

  const handleSubmit = () => {};
  //TODO: This state should be updated dynamically with the toggle
  const darkMode = false;
  return (
    <div
      className={`w-full max-w-md p-4 shadow-md rounded-lg min-w-32 ${
        darkMode ? "bg-gray-600 text-white" : "bg-white text-gray-900"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label
          htmlFor="new-todo"
          className={`font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          New Todo
        </label>
        <input
          type="text"
          id="new-todo"
          name="newTodo"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          className={`p-2 border rounded ${
            darkMode
              ? "border-gray-600 focus:ring-blue-300"
              : "border-gray-300 focus:ring-blue-500"
          } outline-none`}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </form>

      <ul className="mt-4">
          <li
            className={`flex justify-between items-center p-2 rounded mt-2 shadow ${
              darkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <span
            // use the line-through if a todo is completed
               className={`${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
            </span>
            <div className="flex flex-row gap-4">
                <button
                  // complete todo onClick
                  className="px-4 text-sm bg-green-500 hover:bg-green-600 text-white p-1 rounded transition duration-200"
                >
                  Done
                </button>

              <button
                // delete Todo onclick
                className="px-4 text-sm bg-red-500 hover:bg-red-600 text-white p-1 rounded transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
      </ul>
      <DarkModeToggle />
    </div>
  );
};
export default TodoList;
