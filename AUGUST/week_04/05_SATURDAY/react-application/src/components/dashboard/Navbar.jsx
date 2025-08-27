import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();

  return (

    <nav className="sticky z-50 flex items-center justify-between w-4/5 px-6 py-4 mx-auto  bg-[linear-gradient(to_right,_#fec76f_0%,_#c3e7ff_100%)] hover:opacity-80 transition-opacity duration-300 rounded-full shadow-lg top-5  dark:text-black-500">

      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="relative w-16 h-8 transition-colors duration-300 bg-gray-300 rounded-full shadow-inner dark:bg-gray-700"
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-8 bg-yellow-400" : ""
              }`}
          ></span>
        </button>
      </div>


      <div className="flex space-x-6">
        <a href="#" className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
          Home
        </a>
        <a href="#" className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
          About
        </a>
        <a href="#" className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
          Contact
        </a>
      </div>
    </nav>

  );
}

export default Navbar;