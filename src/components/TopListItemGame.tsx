import { useNavigate } from "react-router-dom";
import useVideoError from "../hooks/useVideoError";
import { InfoSingleGame } from "../types/types";
import { PiMedalFill } from "react-icons/pi";

interface TopListItamGameProps extends InfoSingleGame {
  order: number;
}

const TopListItamGame = (props: TopListItamGameProps) => {
  const { id, short_description, thumbnail, title, order } = props;
  const { videoError, setErrorTrue, setErrorFalse } = useVideoError();
  const navigate = useNavigate();
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

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3 bg-primary px-3 py-2 group w-full rounded-lg cursor-default transition-all duration-300 hover:scale-105 hover:z-10"
      onClick={() =>
        navigate(`/${title.replace(/ /g, "-").toLowerCase()}`, {
          state: { id },
        })
      }
    >
      <div className="w-8 flex items-center justify-center max-sm:w-2">
        <span className="font-bold text-xl text-neutral">{order}</span>
      </div>
      <div className="flex-none w-60 h-36 rounded overflow-hidden max-sm:w-44">
        <picture className="h-full w-full relative">
          <img
            src={thumbnail}
            alt={`Image of ${title}`}
            className="block h-full w-full object-fill hover:opacity-0"
          />
          {!videoError ? (
            <video
              onCanPlay={() => setErrorFalse()}
              onError={() => setErrorTrue()}
              autoPlay
              muted
              loop
              preload="none"
              className="absolute hidden group-hover:block z-10 inset-0 h-full w-full object-fill"
            >
              <source
                src={`https://www.freetogame.com/g/${id}/videoplayback.webm`}
                type="video/webm"
              />
              <p>Tu navegador no soporta el elemento de video.</p>
            </video>
          ) : (
            <img
              src={thumbnail}
              alt={`Image of ${title}`}
              className="absolute inset-0 block z-10 h-full w-full object-fill "
            />
          )}
        </picture>
      </div>
      <div className="flex-auto w-96 flex flex-col justify-center items-start gap-1 max-sm:w-full">
        <h3 className="text-2xl font-bold text-primary-content tracking-wider max-sm:text-xl">
          {title}
        </h3>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium text-lg text-primary-content max-sm:text-base">
          {short_description}
        </p>
        <div className="flex justify-between items-center gap-1">
          <div>
            <PiMedalFill />
          </div>
          <p className="text-sm font-medium text-neutral-focus">
            {title} is currently one of the most-played games in{" "}
            {months[date.getMonth()]} {date.getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopListItamGame;
