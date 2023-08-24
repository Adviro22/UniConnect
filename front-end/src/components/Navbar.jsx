import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4c-2.75 0-5 2.25-5 5s2.25 5 5 5 5-2.25 5-5-2.25-5-5-5zM12 14c3.33 0 9 1.67 9 5v2H3v-2c0-3.33 5.67-5 9-5z" />
    </svg>
  );

  return (
    <nav className="bg-green-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold text-white">
        <Link to={isAuthenticated ? "/allpublications" : "/"}>UniConnect+</Link>
      </h1>
      <ul className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <li>
              <span className="flex items-center">
                {UserIcon} <span className="ml-2"> {user.email}</span>
              </span>
            </li>
            <li>
              <ButtonLink to="/add-publication" className="transition duration-300 ease-in-out transform hover:scale-105">Publicar</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/publications" className="transition duration-300 ease-in-out transform hover:scale-105">Mis Publicaciones</ButtonLink>
            </li>
            <li>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => logout()}
              >
                <span className="ml-1">Logout</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login" className="transition duration-300 ease-in-out transform hover:scale-105">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register" className="transition duration-300 ease-in-out transform hover:scale-105">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
