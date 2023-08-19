import axios from "axios";
import { useEffect, useState } from "react";
import { createOptions } from "../utils/helpers";
import { InfoSingleGame, sortedBy } from "../types/types";
import { BASEURL } from "../api/url";
import { useNavigate } from "react-router-dom";

const optionsRecently = createOptions(
  { "sort-by": sortedBy.Relevance },
  BASEURL
);

const LISTLENGTH = 4;

export default function MostPlayed() {
  const [mostPlayed, setMostPlayed] = useState<Array<InfoSingleGame>>([]);
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();

  const handleVideoError = () => {
    setVideoError(true);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.request(optionsRecently);
      const arr = data.slice(0, LISTLENGTH);
      setMostPlayed(arr);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-4 flex-initial w-[min(20rem,100%)] ">
      <h2 className="text-lg font-semibold text-neutral-content">
        Most Played
      </h2>
      <div className="flex flex-wrap gap-3 justify-between">
        {mostPlayed.map((el) => {
          return (
            <div
              key={el.id}
              className="relative h-[13.5rem] group rounded-md overflow-hidden flex-wrap transition-all duration-500 hover:scale-105"
              onClick={() =>
                navigate(`/${el.title.replace(/ /g, "-").toLowerCase()}`, {
                  state: { id: el.id },
                  replace: true,
                })
              }
            >
              <picture className="inline-block h-full w-full">
                <img
                  src={el.thumbnail}
                  alt={el.title}
                  className="w-full h-full group-hover:opacity-0"
                />
              </picture>
              {!videoError ? (
                <video
                  onCanPlay={() => setVideoError(false)}
                  onError={handleVideoError}
                  autoPlay
                  muted
                  loop
                  preload="none"
                  className="absolute inset-0 hidden group-hover:block z-10 object-fill h-full w-full"
                >
                  <source
                    src={`https://www.freetogame.com/g/${el.id}/videoplayback.webm`}
                    type="video/webm"
                  />
                  <p>Tu navegador no soporta el elemento de video.</p>
                </video>
              ) : (
                <img
                  src={el.thumbnail}
                  alt={el.title}
                  className="w-full h-full absolute inset-0"
                />
              )}
              <span className="absolute bottom-2 right-2 py-2 px-3 bg-base-100 text-primary font-bold rounded-md cursor-default group-hover:opacity-0">
                Free
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
