import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 flex items-center justify-between w-full h-16 p-2 bg-opacity-100 shadow-sm lg:shadow-none lg:bg-opacity-0 lg:dark:bg-opacity-0 text-background-900 dark:text-background-50 bg-background-50 dark:bg-background-900 ">
      <div> </div>
      <button
        onClick={() => document.body.classList.toggle("dark")}
        className="w-12 h-12 p-2 rounded-lg hover:bg-background-100 dark:hover:bg-background-800 hover:shadow-inner"
      >
        <FaMoon className="block w-6 h-6 m-auto fill-primary-500 dark:hidden" />
        <IoSunnySharp className="hidden w-6 h-6 m-auto fill-secondary-500 dark:block" />
      </button>
    </nav>
  );
}
