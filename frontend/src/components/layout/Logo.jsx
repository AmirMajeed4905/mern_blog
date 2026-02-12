import { FaReact } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-all">
        <FaReact className="text-white w-5 h-5" />
      </div>

      {/* Text */}
      <h2 className="text-lg md:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        AM
      </h2>
    </div>
  );
};

export default Logo;
