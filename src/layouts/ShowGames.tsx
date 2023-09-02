import { useEffect, useRef, useState } from "react";
import { InfoSingleGame, platform, tags } from "../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFilter, separateByRegExp } from "../utils/helpers";
import { CardGame, DropMenu, Header, Poster } from "../components";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

export default function ShowGames() {
  const navigate = useNavigate();
  const { state, pathname, search } = useLocation();
  const [games, setGames] = useState<InfoSingleGame[]>([]);
  const gamesRef = useRef<InfoSingleGame[] | null>(null);
  const { targetRef, limit, handleLimit } = useIntersectionObserver(
    () => {
      handleLimit(20);
    },
    { threshold: 1.0, rootMargin: "0px 0px 0px 0px" }
  );

  useEffect(() => {
    // console.log(state, search, pathname, search === "");
    const fetchData = async () => {
      try {
        if (state === null && search === "") {
          console.log("Acá con boton y con escritura directa");
          const stateValue = separateByRegExp(pathname, /\//g).slice(1);
          if (stateValue.length === 1) {
            const platformValue =
              stateValue[0] === "games" ? "all" : stateValue[0];
            const resp = await fetchFilter(
              { platform: platformValue, tag: undefined },
              search
            );
            setGames(resp);
            gamesRef.current = resp;
          } else if (stateValue.length === 2) {
            const platformValue =
              stateValue[0] === "games" ? "all" : stateValue[0];
            const resp = await fetchFilter(
              { platform: platformValue, category: stateValue[1] },
              search
            );
            setGames(resp);
            gamesRef.current = resp;
          }
        } else if (state === null && search !== "") {
          const stateValue = separateByRegExp(pathname, /\//g).slice(1);
          const tagValue = stateValue.length === 1 ? undefined : stateValue[1];
          const platformValue =
            stateValue[0] === "games" ? "all" : stateValue[0];
          const resp = await fetchFilter(
            { platform: platformValue, tag: tagValue },
            search
          );
          setGames(resp);
          gamesRef.current = resp;
        } else {
          const resp = await fetchFilter(state, search);
          setGames(resp);
          gamesRef.current = resp;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [state, search]);

  // console.log(
  //   pathname,
  //   // separateByRegExp(pathname, /\//g).slice(1),
  //   separateByRegExp(pathname, /\//g).slice(1)[0],
  //   separateByRegExp(pathname, /\//g).slice(1)[1]
  //   // search === "",
  //   // separateByRegExp(search, /[\?\=]/g).slice(1)[0],
  //   // separateByRegExp(search, /[\?\=]/g).slice(1)[1]
  // );

  const DropMenuOptionsTags = tags.map((el) => {
    return {
      label: el,
      action: () => {
        const path = separateByRegExp(pathname, /\//g).slice(1);
        const platformValue = path[0] === "games" ? "all" : path[0];
        console.log(path, search, state);
        if (
          (path.length === 1 && search === "") ||
          (path.length === 2 && search === "")
        ) {
          navigate(`/${path[0]}/${el}`, {
            state: { platform: platformValue, category: el },
          });
        } else if (
          (path.length === 1 && search !== "") ||
          (path.length === 2 && search !== "")
        ) {
          navigate(
            `/${path[0]}/${el}?${
              separateByRegExp(search, /[\?\=]/g).slice(1)[0]
            }=${separateByRegExp(search, /[\?\=]/g).slice(1)[1]}`,
            {
              state: {
                platform: platformValue,
                category: el,
                [separateByRegExp(search, /[\?\=]/g).slice(1)[0]]:
                  separateByRegExp(search, /[\?\=]/g).slice(1)[1],
              },
            }
          );
        }
      },
    };
  });

  console.log(games);
  const arr: Array<InfoSingleGame> | null =
    games === null
      ? null
      : [...games].sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex flex-col px-20 py-6 gap-6 bg-neutral">
        <div className="flex flex-col gap-3">
          <h2 className="text-neutral-content font-bold text-3xl">
            Top Free Games for PC and Browser In 2023!
          </h2>
          <span className="text-neutral-content">
            <strong className="text-neutral-content">{games.length}</strong>{" "}
            free-to-play <strong className="text-neutral-content">games</strong>{" "}
            found in our games list
          </span>
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          {!games || games.length === 0
            ? [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-64"
                >
                  <span className="loading loading-spinner text-primary loading-lg"></span>
                </div>
              ))
            : arr?.map((el) => (
                <div className="flex-auto w-72 h-56" key={el.id}>
                  <Poster
                    id={el.id}
                    title={el.title}
                    thumbnail={el.thumbnail}
                    height="h-full"
                  />
                </div>
              ))}
        </div>
        <div className="flex flex-wrap gap-4 max-lg:flex-col max-lg:justify-center max-lg:items-center">
          <div className="flex gap-3 flex-initial w-60 items-center max-lg:justify-between">
            <span>Platform:</span>
            <DropMenu
              filterType="platform"
              options={[
                {
                  label: "Windows (PC)",
                  action: () => {
                    const path = separateByRegExp(pathname, /\//g).slice(1);
                    console.log(path);
                    if (path.length === 2 && search === "") {
                      navigate(`/pc/${path[1]}`, {
                        state: { platform: platform.PC, category: path[1] },
                      });
                    } else if (path.length === 2 && search != "") {
                      navigate(
                        `/pc/${path[1]}?${
                          separateByRegExp(search, /[\?\=]/g).slice(1)[0]
                        }=${separateByRegExp(search, /[\?\=]/g).slice(1)[1]}`,
                        {
                          state: {
                            platform: platform.PC,
                            category: path[1],
                            [separateByRegExp(search, /[\?\=]/g).slice(1)[0]]:
                              separateByRegExp(search, /[\?\=]/g).slice(1)[1],
                          },
                        }
                      );
                    } else {
                      navigate("/pc", { state: { platform: platform.PC } });
                    }
                  },
                },
                {
                  label: "Browser (WEB)",
                  action: () => {
                    const path = separateByRegExp(pathname, /\//g).slice(1);
                    if (path.length === 2 && search === "") {
                      navigate(`/browser/${path[1]}`, {
                        state: {
                          platform: platform.Browser,
                          category: path[1],
                        },
                      });
                    } else if (path.length === 2 && search != "") {
                      navigate(
                        `/browser/${path[1]}?${
                          separateByRegExp(search, /[\?\=]/g).slice(1)[0]
                        }=${separateByRegExp(search, /[\?\=]/g).slice(1)[1]}`,
                        {
                          state: {
                            platform: platform.Browser,
                            category: path[1],
                            [separateByRegExp(search, /[\?\=]/g).slice(1)[0]]:
                              separateByRegExp(search, /[\?\=]/g).slice(1)[1],
                          },
                        }
                      );
                    } else {
                      navigate("/browser", {
                        state: { platform: platform.Browser },
                      });
                    }
                  },
                },
                {
                  label: "All Platforms",
                  action: () => {
                    const path = separateByRegExp(pathname, /\//g).slice(1);
                    if (path.length === 2 && search === "") {
                      navigate(`/games/${path[1]}`, {
                        state: { platform: platform.All, category: path[1] },
                      });
                    } else if (path.length === 2 && search != "") {
                      navigate(
                        `/games/${path[1]}?${
                          separateByRegExp(search, /[\?\=]/g).slice(1)[0]
                        }=${separateByRegExp(search, /[\?\=]/g).slice(1)[1]}`,
                        {
                          state: {
                            platform: platform.All,
                            category: path[1],
                            [separateByRegExp(search, /[\?\=]/g).slice(1)[0]]:
                              separateByRegExp(search, /[\?\=]/g).slice(1)[1],
                          },
                        }
                      );
                    } else {
                      navigate("/games", { state: { platform: platform.All } });
                    }
                  },
                },
              ]}
            />
          </div>
          <div className="flex gap-3 flex-initial w-60 items-center max-lg:justify-between">
            <span>Genre/ Tag:</span>
            <DropMenu filterType="tag" options={DropMenuOptionsTags} />
          </div>
          <div className="flex gap-3 flex-initial w-60 items-center max-lg:justify-between">
            <span>Sort by:</span>
            <DropMenu
              filterType="sort-by"
              options={[
                {
                  label: "Relevance",
                  action: () => {
                    const path = separateByRegExp(pathname, /\//g).slice(1);
                    console.log(path);
                    const platformValue = path[0] === "games" ? "all" : path[0];
                    if (path.length === 1) {
                      navigate(`/${path.join()}?sort-by=relevance`);
                    } else if (path.length === 2) {
                      // const sortKeyAndValue = separateByRegExp(
                      //   location.search,
                      //   /[\?\=]/g
                      // ).slice(1);
                      navigate(`/${path[0]}/${path[1]}?sort-by=relevance`, {
                        state: {
                          platform: platformValue,
                          category: path[1],
                          "sort-by": "relevance",
                        },
                      });
                    }
                  },
                },
                {
                  label: "Popularity",
                  action: () => {
                    const path = separateByRegExp(pathname, /\//g).slice(1);
                    const platformValue = path[0] === "games" ? "all" : path[0];
                    if (path.length === 1) {
                      navigate(`/${path.join()}?sort-by=popularity`);
                    } else if (path.length === 2) {
                      // const sortKeyAndValue = separateByRegExp(
                      //   location.search,
                      //   /[\?\=]/g
                      // ).slice(1);
                      navigate(`/${path[0]}/${path[1]}?sort-by=popularity`, {
                        state: {
                          platform: platformValue,
                          category: path[1],
                          "sort-by": "popularity",
                        },
                      });
                    }
                  },
                },
                {
                  label: "Release Date",
                  action: () => {
                    const path = separateByRegExp(pathname, /\//g).slice(1);
                    const platformValue = path[0] === "games" ? "all" : path[0];
                    if (path.length === 1) {
                      navigate(`/${path.join()}?sort-by=release-date`);
                    } else if (path.length === 2) {
                      // const sortKeyAndValue = separateByRegExp(
                      //   location.search,
                      //   /[\?\=]/g
                      // ).slice(1);
                      navigate(`/${path[0]}/${path[1]}?sort-by=release-date`, {
                        state: {
                          platform: platformValue,
                          category: path[1],
                          "sort-by": "release-date",
                        },
                      });
                    }
                  },
                },
                {
                  label: "Alphabetical",
                  action: () => {
                    const path = separateByRegExp(pathname, /\//g).slice(1);
                    const platformValue = path[0] === "games" ? "all" : path[0];
                    if (path.length === 1) {
                      navigate(`/${path.join()}?sort-by=alphabetical`);
                    } else if (path.length === 2) {
                      // const sortKeyAndValue = separateByRegExp(
                      //   location.search,
                      //   /[\?\=]/g
                      // ).slice(1);
                      navigate(`/${path[0]}/${path[1]}?sort-by=alphabetical`, {
                        state: {
                          platform: platformValue,
                          category: path[1],
                          "sort-by": "alphabetical",
                        },
                      });
                    }
                  },
                },
              ]}
            />
          </div>
        </div>
        <div
          id="grid"
          className="grid gap-4 grid-flow-dense grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]"
        >
          {gamesRef
            ? gamesRef.current?.slice(0, limit).map((el, index) => {
                if (index === limit - 1) {
                  return (
                    <div ref={targetRef} key={el.id}>
                      <CardGame
                        id={el.id}
                        thumbnail={el.thumbnail}
                        title={el.title}
                        replaceValue={false}
                        loadVideo={false}
                      />
                    </div>
                  );
                } else {
                  return (
                    <CardGame
                      key={el.id}
                      id={el.id}
                      thumbnail={el.thumbnail}
                      title={el.title}
                      replaceValue={false}
                      loadVideo={false}
                    />
                  );
                }
              })
            : ""}
        </div>
      </main>
    </>
  );
}
