// Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  //TODO: This state should be updated dynamically with the toggle
  const darkMode = false;

  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/todo"
            className={`px-3 py-2 rounded ${
              darkMode ? "bg-gray-700 text-white" : "bg-blue-500 text-white"
            } hover:bg-blue-600`}
          >
            Todo List
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className={`px-3 py-2 rounded ${
              darkMode ? "bg-gray-700 text-white" : "bg-blue-500 text-white"
            } hover:bg-blue-600`}
          >
            Calendar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
