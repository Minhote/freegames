import React, { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const [isNavVisible, setIsNavVisible] = useState(false);

  const daisyThemes = ["luxury", "winter"];

  useEffect(() => {
    localStorage.setItem("theme", `${theme}`);
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "light") {
      document
        .querySelector("html")
        ?.setAttribute("data-theme", `${daisyThemes[0]}`);
    } else if (localTheme === "dark") {
      document
        .querySelector("html")
        ?.setAttribute("data-theme", `${daisyThemes[1]}`);
    } else {
      document
        .querySelector("html")
        ?.setAttribute("data-theme", `${daisyThemes[0]}`);
    }
  }, [theme]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  function handleHamburguerClick() {
    setIsNavVisible(!isNavVisible);
  }

  return (
    <>
      <header className="flex flex-wrap items-center justify-between bg-primary px-3 py-1  h-[50px]  md:h-auto relative border-b-[1px]">
        <h1 className="text-xl font-bold text-primary-content">FreeGames</h1>
        <nav
          className={`absolute right-0 top-[50px] md:static transition-all duration-500  max-md:z-10 ${
            isNavVisible ? "max-md:translate-x-0" : "max-md:translate-x-full"
          }`}
        >
          <ul className="h-full w-[150px] md:w-full flex items-center justify-center gap-5 flex-col md:flex-row">
            <li>
              <div className="dropdown dropdown-hover hover:bg-none">
                <label
                  tabIndex={0}
                  className="text-primary-content font-semibold"
                >
                  Free Games
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box flex flex-col items-start gap-1 max-md:-left-[160px]"
                >
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      MMORPG
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Shooter
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Anime
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Strategy
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Fantasy
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Sci-Fi
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Racing
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Social
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Sports
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Games
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="dropdown dropdown-hover hover:bg-none">
                <label
                  tabIndex={0}
                  className="text-primary-content font-semibold"
                >
                  Browser Games
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box flex flex-col items-start gap-1 max-md:-left-[160px]"
                >
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser MMORPG
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser Shooter
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser Anime
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser Strategy
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser Fantasy
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser Sci-Fi
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser Racing
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser Social
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser Sports
                    </a>
                  </li>
                  <li className="group">
                    <a className="group-hover:font-bold group-hover:text-primary-content text-primary-content">
                      Browser Games
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="py-1 text-primary-content font-semibold">
              Most Popuplar
            </li>
            <li className="py-1 text-primary-content font-semibold">
              Top 2023
            </li>
          </ul>
        </nav>
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={handleChange}
            checked={theme === "light" ? false : true}
          />

          {/* sun icon */}
          <svg
            className="swap-on fill-current w-10 h-10 text-primary-content"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-current w-10 h-10 text-primary-content"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <label className="swap swap-rotate order-1 md:hidden">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onClick={handleHamburguerClick} />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </header>
    </>
  );
}
