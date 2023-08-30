import { IconContext } from "react-icons";
import { FaHeadset } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-content">
      <div className="flex flex-col items-center justify-center gap-3 py-3">
        <IconContext.Provider
          value={{ className: "text-primary-content h-10 font-xl w-10" }}
        >
          <FaHeadset />
        </IconContext.Provider>
        <p className="text-3xl font-extrabold">FreeGame</p>
      </div>
    </footer>
  );
}
