import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  createOptions,
  separateByRegExp,
  toCapitalCase,
} from "../utils/helpers";
import { FILTERURL, UNIQUEIDURL } from "../api/url";
import { GameInfoData, tags } from "../types/types";
import { CardGame, Footer, Header } from "../components";
import useVideoError from "../hooks/useVideoError";
//Video URL ejemplo https://www.freetogame.com/g/470/videoplayback.webm
// Url de imagen de fondo https://www.freetogame.com/g/452/background.webp

export default function GameInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [gameInfo, setGameInfo] = useState<GameInfoData>();
  const [similarGames, setSimilarGames] = useState<GameInfoData[]>([]);
  const { videoError, setErrorTrue, setErrorFalse } = useVideoError();

  const heightTotal =
    Array.from(document.querySelectorAll(".par")).reduce(
      (prev, acc) => (prev += acc.clientHeight),
      0
    ) + 20;

  const handleExpand = (e: any) => {
    const class2 = `h-[${heightTotal}px]`;
    if (e.target.textContent === "Read More") {
      e.target.textContent = "Read Less";
      document.querySelector("#summary")?.classList.remove("h-52");
      document.querySelector("#summary")?.classList.toggle(class2);
    } else {
      e.target.textContent = "Read More";
      document.querySelector("#summary")?.classList.toggle(class2);
      document.querySelector("#summary")?.classList.toggle("h-52");
    }
  };

  useEffect(() => {
    (async () => {
      const optionsSingleInfo = createOptions({ id: state.id }, UNIQUEIDURL);
      const { data } = await axios.request<GameInfoData>(optionsSingleInfo);
      setGameInfo(data);
      const tag = tags
        .filter((el) => el.includes(data.genre.split(" ")[0].toLowerCase()))
        .join();
      console.log(tag, data.genre.split(" ")[0], state.id);
      // const platformValue =
      //   data.platform === "Windows"
      //     ? "pc"
      //     : data.platform === "Web Browser"
      //     ? "browser"
      //     : "all";
      const optionsGamesLikeThis = createOptions({ tag }, FILTERURL);
      const resp = await axios.request(optionsGamesLikeThis);
      console.log(optionsGamesLikeThis, resp.data);
      const similar = resp.data
        .filter((el: GameInfoData) => el.title !== data.title)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setSimilarGames(similar);
    })();
  }, [state]);

  if (gameInfo) {
    const {
      id,
      title,
      thumbnail,
      description,
      developer,
      genre,
      platform,
      publisher,
      release_date,
      screenshots,
      minimum_system_requirements,
    } = gameInfo;
    const par = separateByRegExp(description, /\r\n\r\n/g);

    return (
      <>
        <Header />
        <main className="flex flex-wrap px-11 py-6 gap-5 items-start bg-neutral max-md:flex-col max-md:items-center">
          <div className="flex flex-col gap-4 flex-initial w-80 sticky top-[6rem] z-10 max-md:static max-md:w-full">
            <span className="text-xs inline-flex items-center gap-2 md:hidden">
              <a
                className="text-primary cursor-default"
                onClick={() => navigate("/")}
              >
                Home
              </a>
              &gt;
              <a
                className="text-primary cursor-default"
                onClick={() => navigate("/games")}
              >
                Free Games
              </a>
              &gt;{" "}
              <span className="text-base-content font-semibold">{title}</span>
            </span>
            <h2 className="text-2xl font-bold text-neutral-content md:hidden">
              {title}
            </h2>
            <figure
              className="w-full flex max-md:w-2/3 max-md:self-center"
              key={
                id
              } /* Importante este atributo para asegurarse de que se actualice el video */
            >
              {!videoError ? (
                <video
                  key={id}
                  className="object-fill  h-full w-full"
                  onCanPlay={() => setErrorFalse()}
                  onError={() => setErrorTrue()}
                  autoPlay
                  muted
                  loop
                >
                  <source
                    key={id}
                    src={`https://www.freetogame.com/g/${id}/videoplayback.webm`}
                    type="video/webm"
                  />
                </video>
              ) : (
                <img src={thumbnail} alt={`Image of ${title}`} />
              )}
            </figure>
          </div>
          <div className="flex flex-col gap-4 flex-1 max-sm:w-full">
            <span className="text-xs inline-flex items-center gap-2 max-md:hidden">
              <a
                className="text-primary cursor-default"
                onClick={() => navigate("/")}
              >
                Home
              </a>
              &gt;
              <a
                className="text-primary cursor-default"
                onClick={() => navigate("/games")}
              >
                Free Games
              </a>
              &gt;{" "}
              <span className="text-base-content font-semibold">{title}</span>
            </span>
            <h2 className="text-2xl font-bold text-neutral-content max-md:hidden">
              {title}
            </h2>
            <div
              className={`flex flex-col gap-2 overflow-hidden ease-in-out duration-500 transition-height my-3 ${
                par.length < 3 ? "h-auto" : "h-52"
              } max-sm:h-auto`}
              id="summary"
            >
              <h3 className="text-xl font-semibold text-neutral-content border-b pb-1 border-b-primary-focus">
                About {title}
              </h3>
              {par.map((p) => (
                <p key={p} className="text-base-content par">
                  {p}
                </p>
              ))}
            </div>
            <span
              className={`text-base text-info font-semibold cursor-pointer ${
                par.length < 3 ? "hidden" : ""
              } max-sm:hidden`}
              id="expand"
              onClick={(e) => handleExpand(e)}
            >
              Read More
            </span>
            <div className="flex gap-8 flex-col my-3 max-sm:w-full">
              <h2 className="text-xl font-bold text-neutral-content border-b pb-1 border-b-primary-focus">
                Aditional Information
              </h2>
              <div className="flex flex-wrap gap-6 justify-start">
                <div className="flex flex-col gap-1 flex-auto w-56 max-sm:w-full">
                  <span className="text-sm text-primary">Title</span>
                  <p className="text-lg text-neutral-content font-semibold">
                    {title}
                  </p>
                </div>
                <div className="flex flex-col gap-1 flex-auto w-56 max-sm:w-full">
                  <span className="text-sm text-primary">Developer</span>
                  <p className="text-lg text-neutral-content font-semibold">
                    {developer}
                  </p>
                </div>
                <div className="flex flex-col gap-1 flex-auto w-56 max-sm:w-full">
                  <span className="text-sm text-primary">Publisher</span>
                  <p className="text-lg text-neutral-content font-semibold">
                    {publisher}
                  </p>
                </div>
                <div className="flex flex-col gap-1 flex-auto w-56 max-sm:w-full">
                  <span className="text-sm text-primary">Genre</span>
                  <p className="text-lg text-neutral-content font-semibold">
                    {genre}
                  </p>
                </div>
                <div className="flex flex-col gap-1 flex-auto w-56 max-sm:w-full">
                  <span className="text-sm text-primary">Platform</span>
                  <p className="text-lg text-neutral-content font-semibold">
                    {platform}
                  </p>
                </div>
                <div className="flex flex-col gap-1 flex-auto w-56 max-sm:w-full">
                  <span className="text-sm text-primary">Release Date</span>
                  <p className="text-lg text-neutral-content font-semibold">
                    {release_date.toString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 my-3 max-sm:w-full">
              <h2 className="text-xl font-bold text-neutral-content border-b pb-1 border-b-primary-focus">
                {title} Screenshots
              </h2>
              <div className="flex flex-wrap gap-4">
                {screenshots.map((s) => (
                  <figure key={s.id.toString()} className="flex-auto w-40">
                    <img
                      src={s.image}
                      alt={s.id.toString()}
                      className="object-fill w-full h-full"
                    />
                  </figure>
                ))}
              </div>
            </div>
            <div className="flex flex-col my-3 max-sm:w-full">
              <h2 className="text-xl font-bold text-neutral-content border-b pb-1 border-b-primary-focus my-3">
                Minimun System Requeriments{" "}
                <span className="text-sm text-base-content font-medium">
                  ({platform})
                </span>
              </h2>
              {platform === "Web Browser" ? (
                <p>
                  {title} is a browser based game and should run smoothly on
                  practically any PC with a updated web-browser. If you have old
                  hardware or software, you may still be able to play Game Of
                  Thrones Winter Is Coming, but your game experience may suffer.
                  For the best gameplay experience, we recommend the latest
                  versions of Firefox, Chrome, or Internet Explorer.
                </p>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {Object.entries(minimum_system_requirements).map((el) => (
                    <div
                      key={el[0]}
                      className="flex flex-col gap-1 flex-auto w-80"
                    >
                      <span className="text-sm text-primary">
                        {el[0] === "os"
                          ? el[0].toUpperCase()
                          : toCapitalCase(el[0])}
                      </span>
                      <p className="text-lg text-neutral-content font-medium">
                        {el[1]}
                      </p>
                    </div>
                  ))}
                  <div className="flex flex-col gap-1 flex-auto w-80">
                    <span className="text-sm text-primary">
                      Aditional Notes
                    </span>
                    <p className="text-lg text-neutral-content font-medium">
                      Specifications may change during development
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col my-3 max-sm:w-full">
              <h2 className="flex justify-between items-center text-xl font-bold text-neutral-content border-b pb-1 border-b-primary-focus my-3 max-sm:flex-col max-sm:items-start max-sm:gap-4">
                Games Like {title}
                <a className="text-sm font-normal rounded py-2 px-2 cursor-default border border-info text-info-content bg-info hover:bg-transparent hover:border-info hover:text-info hover:font-semibold">
                  See All &gt;
                </a>
              </h2>
              <div className="flex flex-wrap gap-4">
                {similarGames.map((el) => (
                  <div key={el.id} className="flex-auto w-44">
                    <CardGame {...el} replaceValue={true} loadVideo={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
