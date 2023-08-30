import { useState } from "react";
import { useLocation } from "react-router-dom";
import { separateByRegExp, toCapitalCase } from "../utils/helpers";
import { sortedBy } from "../types/types";

interface Options {
  label: string;
  action: () => void;
}

interface DropMenuProps {
  options: Array<Options>;
  filterType: "platform" | "tag" | "sort-by";
}

const DropMenu = ({ options, filterType }: DropMenuProps) => {
  const location = useLocation();
  // console.log(
  //   location.search,
  //   separateByRegExp(location.search, /[\?\=]/g),
  //   separateByRegExp(location.search, /[\?\=]/g).slice(1)[1]
  // );
  const [isOpen, setIsOpen] = useState(false);
  // const [platformValue, setPlatformValue] = useState<platform>(platform.All);

  const titlePlatform =
    separateByRegExp(location.pathname, /\//g).slice(1).includes("games") &&
    filterType === "platform"
      ? "All Platforms"
      : separateByRegExp(location.pathname, /\//g).slice(1).includes("pc") &&
        filterType === "platform"
      ? "Windows (PC)"
      : "Browser (WEB)";

  const titleTag =
    separateByRegExp(location.pathname, /\//g).slice(1).length === 1 &&
    filterType === "tag"
      ? "All Genres"
      : separateByRegExp(location.pathname, /\//g).slice(1)[1];

  return (
    <>
      <div
        className="flex gap-3 items-center relative px-3"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-bold">
          {filterType === "platform"
            ? titlePlatform
            : filterType === "tag"
            ? titleTag === "mmorpg"
              ? titleTag.toUpperCase()
              : toCapitalCase(titleTag)
            : filterType === "sort-by" && location.search === ""
            ? toCapitalCase(sortedBy.Relevance)
            : toCapitalCase(
                separateByRegExp(location.search, /[\?\=]/g).slice(1)[1]
              )}
        </span>
        <div
          className={`border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary transition-all duration-300 ${
            !isOpen ? "rotate-0" : "rotate-180"
          }`}
        ></div>
        <ul
          className={`absolute top-11 w-full left-0 right-0 z-10 bg-neutral rounded-sm  cursor-default ${
            !isOpen ? "hidden" : "block"
          } ${options.length > 4 ? "h-40 overflow-y-scroll" : ""}`}
        >
          {options.map((el) => {
            return (
              <li
                key={el.label}
                className="p-2 text-sm hover:font-semibold cursor-default list-none"
                onClick={() => {
                  el.action();
                }}
              >
                {el.label}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DropMenu;
