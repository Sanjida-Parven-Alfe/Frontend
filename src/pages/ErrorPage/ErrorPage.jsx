import { Link, useRouteError } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white p-6 text-center">
      <FaExclamationTriangle className="text-8xl text-red-500 mb-6 animate-bounce" />
      <h1 className="text-5xl font-extrabold mb-4 text-brand-teal">Oops!</h1>
      <p className="text-xl mb-2 text-gray-400 font-medium">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-gray-500 italic mb-8 bg-black/30 p-4 rounded-lg border border-white/5">
        {error.statusText || error.message}
      </p>
      <Link to="/">
        <button className="btn bg-brand-teal hover:bg-teal-400 text-black border-none gap-2 font-bold px-8">
          <FaHome /> Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
