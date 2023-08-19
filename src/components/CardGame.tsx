import React, { useState } from "react";
import { GameInfoData } from "../types/types";
import { useNavigate } from "react-router-dom";
//Video URL ejemplo https://www.freetogame.com/g/470/videoplayback.webm

const CardGame: React.FC<GameInfoData> = (props) => {
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const { thumbnail, title, id } = props;

  return (
    <div
      className="flex flex-col group rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 min-h-16"
      onClick={() =>
        navigate(`/${title.replace(/ /g, "-").toLowerCase()}`, {
          state: { id },
          replace: true,
        })
      }
    >
      <picture className="h-3/4 w-full relative ">
        <img
          src={thumbnail}
          alt=""
          className="w-full h-full group-hover:opacity-0"
        />
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
