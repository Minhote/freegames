import { useState } from "react";
import { useLocation } from "react-router-dom";
import { separateByRegExp, toCapitalCase } from "../utils/helpers";
import { platformNames, sortedBy, tags } from "../types/types";

interface Options {
  label: string;
  action: () => void;
}

interface DropMenuProps {
  options: Array<Options>;
  filterType: "platform" | "tag" | "sort-by" | "top-category" | "top-platform";
}

const DropMenu = ({ options, filterType }: DropMenuProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  let result = "";

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

  const titleTopPlatform =
    separateByRegExp(location.pathname, /\//g).slice(1)[0] === "top" &&
    filterType === "top-platform" &&
    separateByRegExp(location.pathname, /\//g).slice(1).length === 1
      ? "Browser and PC"
      : separateByRegExp(location.pathname, /\//g).slice(1)[0] === "top" &&
        filterType === "top-platform" &&
        separateByRegExp(location.pathname, /\//g).slice(1).length === 2 &&
        platformNames.includes(
          separateByRegExp(location.pathname, /\//g).slice(1)[1]
        )
      ? separateByRegExp(location.pathname, /\//g).slice(1)[1]
      : separateByRegExp(location.pathname, /\//g).slice(1)[0] === "top" &&
        filterType === "top-platform" &&
        separateByRegExp(location.pathname, /\//g).slice(1).length === 2 &&
        !platformNames.includes(
          separateByRegExp(location.pathname, /\//g).slice(1)[1]
        )
      ? "Browser and PC"
      : separateByRegExp(location.pathname, /\//g).slice(1)[1];

  const titleTopCategory =
    separateByRegExp(location.pathname, /\//g).slice(1)[0] === "top" &&
    filterType === "top-category" &&
    separateByRegExp(location.pathname, /\//g).slice(1).length === 1
      ? "Select Category"
      : separateByRegExp(location.pathname, /\//g).slice(1)[0] === "top" &&
        filterType === "top-category" &&
        separateByRegExp(location.pathname, /\//g).slice(1).length === 2 &&
        tags.includes(separateByRegExp(location.pathname, /\//g).slice(1)[1])
      ? `Top ${separateByRegExp(location.pathname, /\//g).slice(1)[1]}`
      : separateByRegExp(location.pathname, /\//g).slice(1)[0] === "top" &&
        filterType === "top-category" &&
        separateByRegExp(location.pathname, /\//g).slice(1).length === 2 &&
        !tags.includes(separateByRegExp(location.pathname, /\//g).slice(1)[1])
      ? "Select Category"
      : `Top ${separateByRegExp(location.pathname, /\//g).slice(1)[2]}`;

  if (filterType === "platform") {
    result = titlePlatform;
  } else if (filterType === "tag") {
    if (titleTag === "mmorpg") {
      result = titleTag.toUpperCase();
    } else {
      result = toCapitalCase(titleTag);
    }
  } else if (filterType === "sort-by") {
    if (location.search === "") {
      result = toCapitalCase(sortedBy.Relevance);
    } else {
      result = toCapitalCase(
        separateByRegExp(location.search, /[\?\=]/g).slice(1)[1]
      );
    }
  } else if (filterType === "top-category") {
    result = toCapitalCase(titleTopCategory);
  } else if (filterType === "top-platform") {
    result =
      titleTopPlatform === "pc"
        ? titleTopPlatform.toUpperCase()
        : titleTopPlatform === "browser"
        ? toCapitalCase(titleTopPlatform)
        : titleTopPlatform;
  }

  return (
    <>
      <div
        className="flex gap-3 items-center relative px-3"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-bold min-w-[100px]">{result}</span>
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
