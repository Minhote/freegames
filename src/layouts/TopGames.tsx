import { useLocation, useNavigate } from "react-router-dom";
import { DropMenu, Footer, Header } from "../components";
import { fetchFilter, separateByRegExp, toCapitalCase } from "../utils/helpers";
import { InfoSingleGame, platform, platformNames, tags } from "../types/types";
import { useEffect, useRef, useState } from "react";
import TopListItamGame from "../components/TopListItemGame";

export default function TopGames() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const [dataTop, setDataTop] = useState<InfoSingleGame[]>([]);
  const pathnameToArray = separateByRegExp(pathname, /\//g).slice(1);
  const date = new Date();
  const months = [
    "Januart",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octuber",
    "November",
    "December",
  ];
  const p = useRef<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (
        state === null &&
        separateByRegExp(pathname, /\//g).slice(1).length === 1
      ) {
        const resp = await fetchFilter({ platform: platform.All }, [
          "sort-by",
          "popularity",
        ]);
        setDataTop(resp);
      } else if (
        state === null &&
        separateByRegExp(pathname, /\//g).slice(1).length === 2 &&
        platformNames.includes(separateByRegExp(pathname, /\//g).slice(1)[1])
      ) {
        const resp = await fetchFilter(
          { platform: separateByRegExp(pathname, /\//g).slice(1)[1] },
          ["sort-by", "popularity"]
        );
        setDataTop(resp);
      } else if (
        state === null &&
        separateByRegExp(pathname, /\//g).slice(1).length === 2 &&
        tags.includes(separateByRegExp(pathname, /\//g).slice(1)[1])
      ) {
        const resp = await fetchFilter(
          {
            platform: platform.All,
            category: separateByRegExp(pathname, /\//g).slice(1)[1],
          },
          ["sort-by", "popularity"]
        );
        setDataTop(resp);
      } else if (
        state === null &&
        separateByRegExp(pathname, /\//g).slice(1).length === 3
      ) {
        const resp = await fetchFilter(
          {
            platform: separateByRegExp(pathname, /\//g).slice(1)[1],
            category: separateByRegExp(pathname, /\//g).slice(1)[2],
          },
          ["sort-by", "popularity"]
        );
        setDataTop(resp);
      } else if (state) {
        const resp = await fetchFilter(state, ["sort-by", "popularity"]);
        setDataTop(resp);
      }
    };
    fetchData();
  }, [pathname, state]);

  const DropMenuOptionsTopCategory = tags.map((el) => {
    return {
      label: `Top ${el}`,
      action: () => {
        if (
          separateByRegExp(pathname, /\//g).slice(1).length === 1 ||
          (separateByRegExp(pathname, /\//g).slice(1).length === 2 &&
            tags.includes(separateByRegExp(pathname, /\//g).slice(1)[1]))
        ) {
          navigate(`/top/${el}`, {
            state: { platform: platform.All, category: el },
          });
          p.current = el;
        } else if (
          (separateByRegExp(pathname, /\//g).slice(1).length === 2 &&
            !tags.includes(separateByRegExp(pathname, /\//g).slice(1)[1])) ||
          separateByRegExp(pathname, /\//g).slice(1).length === 3
        ) {
          navigate(
            `/top/${separateByRegExp(pathname, /\//g).slice(1)[1]}/${el}`,
            {
              state: {
                platform: separateByRegExp(pathname, /\//g).slice(1)[1],
                category: el,
              },
            }
          );
          p.current = el;
        }
      },
    };
  });

  const DropMenuOptionsTopPlatform = platformNames.map((el) => {
    return {
      label: `${el}`,
      action: () => {
        if (
          separateByRegExp(pathname, /\//g).slice(1).length === 1 ||
          (separateByRegExp(pathname, /\//g).slice(1).length === 2 &&
            platformNames.includes(
              separateByRegExp(pathname, /\//g).slice(1)[1]
            ))
        ) {
          if (el === "Browser and PC") {
            navigate(`/top`, { state: { platform: platform.All } });
            p.current = "";
          } else {
            navigate(`/top/${el}`, { state: { platform: el } });
            p.current = "";
          }
        } else if (
          separateByRegExp(pathname, /\//g).slice(1).length === 2 &&
          !platformNames.includes(separateByRegExp(pathname, /\//g).slice(1)[1])
        ) {
          if (el === "Browser and PC") {
            navigate(`/top/${separateByRegExp(pathname, /\//g).slice(1)[1]}`, {
              state: {
                platform: platform.All,
                category: separateByRegExp(pathname, /\//g).slice(1)[1],
              },
            });
            p.current = separateByRegExp(pathname, /\//g).slice(1)[1];
          } else {
            navigate(
              `/top/${el}/${separateByRegExp(pathname, /\//g).slice(1)[1]}`,
              {
                state: {
                  platform: el,
                  category: separateByRegExp(pathname, /\//g).slice(1)[1],
                },
              }
            );
            p.current = separateByRegExp(pathname, /\//g).slice(1)[1];
          }
        } else if (separateByRegExp(pathname, /\//g).slice(1).length === 3) {
          if (el === "Browser and PC") {
            navigate(`/top/${separateByRegExp(pathname, /\//g).slice(1)[2]}`, {
              state: {
                platform: platform.All,
                category: separateByRegExp(pathname, /\//g).slice(1)[2],
              },
            });
            p.current = separateByRegExp(pathname, /\//g).slice(1)[2];
          } else {
            navigate(
              `/top/${el}/${separateByRegExp(pathname, /\//g).slice(1)[2]}`,
              {
                state: {
                  platform: el,
                  category: separateByRegExp(pathname, /\//g).slice(1)[2],
                },
              }
            );
            p.current = separateByRegExp(pathname, /\//g).slice(1)[2];
          }
        }
      },
    };
  });

  return (
    <>
      <Header />
      <main className="bg-neutral px-20 py-5 flex flex-col gap-4 min-h-screen">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-4xl text-neutral-contentv max-md:text-2xl max-sm:text-xl">
            {pathnameToArray.length === 1
              ? `Top 10 Free To Play Games for PC and Browser in ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`
              : pathnameToArray.length === 2 && pathnameToArray[1] === "pc"
              ? `Top 10 Free To Play Games for PC in ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`
              : `Top 10 Free To Play Games for Browser in ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`}
          </h2>
          <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2">
            <div className="flex gap-3 items-center max-lg:justify-between">
              <span>More Top 10's:</span>
              <DropMenu
                filterType="top-category"
                options={DropMenuOptionsTopCategory}
              />
            </div>
            <div className="flex gap-3 items-center max-lg:justify-between">
              <span>Platform</span>
              <DropMenu
                filterType="top-platform"
                options={DropMenuOptionsTopPlatform}
              />
            </div>
          </div>
          <p className="text-base font-normal text-neutral-content">
            {`Below, you can find our ongoing Top 10 Free ${toCapitalCase(
              p.current
            )} Games in ${
              months[date.getMonth()]
            } ${date.getFullYear()}. Our ranking is based on
            our users preferences during this calendar month and all results are
            updated daily. You can also use the menu to explore even more Top
            10's for your favorite platforms.`}
          </p>
          <div className="flex flex-col gap-5">
            {dataTop.length > 0
              ? [...dataTop]
                  .slice(0, 10)
                  .map((el, i) => (
                    <TopListItamGame key={el.id} {...el} order={i + 1} />
                  ))
              : "loading"}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
