import React from "react";
// import { GameInfoData } from "../types/types";
import { useNavigate } from "react-router-dom";
import useVideoError from "../hooks/useVideoError";
//Video URL ejemplo https://www.freetogame.com/g/470/videoplayback.webm

interface CardGameProps {
  thumbnail: string;
  title: string;
  id: number;
  replaceValue: boolean;
  loadVideo: boolean;
}

const CardGame: React.FC<CardGameProps> = (props) => {
  const navigate = useNavigate();
  const { setErrorFalse, setErrorTrue, videoError } = useVideoError();

  const { thumbnail, title, id, replaceValue, loadVideo } = props;

  return (
    <div
      className="flex flex-col group rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 min-h-16"
      onClick={() =>
        navigate(`/${title.replace(/ /g, "-").toLowerCase()}`, {
          state: { id },
          replace: replaceValue,
        })
      }
    >
      {!loadVideo ? (
        <picture className="h-3/4 w-full relative ">
          <img src={thumbnail} alt="" className="w-full h-full" />
        </picture>
      ) : (
        <picture className="h-3/4 w-full relative ">
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full group-hover:opacity-0"
          />
          {!videoError ? (
            <video
              onCanPlay={() => setErrorFalse()}
              onError={() => setErrorTrue()}
              autoPlay
              muted
              loop
              preload="none"
              className="absolute inset-0 hidden group-hover:block z-10 object-fill h-full w-full"
            >
              <source
                src={`https://www.freetogame.com/g/${id}/videoplayback.webm`}
                type="video/webm"
              />
              <p>Tu navegador no soporta el elemento de video.</p>
            </video>
          ) : (
            <p className="absolute inset-0 hidden group-hover:flex h-full w-full z-10 items-center justify-center text-neutral-content">
              Vista previa no disponible.
            </p>
          )}
        </picture>
      )}

      <div className="flex  justify-between  items-center p-3 bg-primary text-primary-content rounded-b-xl group-hover:rounded-t-xl">
        <p className="font-bold text-base">{title}</p>
        <span className="py-2 px-3 bg-base-100 text-primary font-bold rounded-md cursor-default">
          Free
        </span>
      </div>
    </div>
  );
};
export default CardGame;
