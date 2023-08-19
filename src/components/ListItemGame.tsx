import { useState } from "react";
import { InfoSingleGame } from "../types/types";
import { FaWindowMaximize, FaWindows } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ListItemGame: React.FC<InfoSingleGame> = (props) => {
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();

  const handleVideoError = () => {
    setVideoError(true);
  };

  const { genre, platform, thumbnail, title, short_description, id } = props;

  return (
    <div
      className="bg-primary text-primary-content rounded-md py-2 px-4  group  flex w-full flex-wrap gap-4 items-center justify-between  transition-all duration-500 hover:z-10 hover:scale-105 max-sm:flex-col  max-sm:gap-8 max-sm:py-6"
      onClick={() =>
        navigate(`/${title.replace(/ /g, "-").toLowerCase()}`, {
          state: { id },
          replace: true,
        })
      }
    >
      <picture className="relative h-24 w-[min(100px,30%)] flex-initial max-sm:w-full max-sm:h-52 max-sm:rounded-md max-sm:overflow-hidden">
        <img
          src={thumbnail}
          alt=""
          className="absolute inset-0 group-hover:opacity-0  h-full w-full"
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
          <img
            src={thumbnail}
            alt=""
            className="absolute inset-0  h-full w-full"
          />
        )}
      </picture>
      <div className="flex-1 w-[min(200px,40%)] max-sm:w-full">
        <h2 className="text-xl font-semibold text-primary-content">{title}</h2>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap w-full max-sm:my-3">
          {short_description}
        </p>
        <span className="inline-block text-primary bg-primary-content self-start rounded-md text-sm py-[0.1rem] px-[0.2rem] font-bold">
          {genre}
        </span>
      </div>
      <div className=" flex justify-around items-center w-[max(100px,20%)] flex-initial max-sm:justify-center max-sm:gap-4">
        {platform.toLowerCase().includes("pc") ? (
          <div className="h-5 w-5">
            <FaWindows />
          </div>
        ) : (
          <div className="h-5 w-5">
            <FaWindowMaximize />
          </div>
        )}
        <span className="py-2 px-3 bg-base-100 text-primary font-bold rounded-md cursor-default">
          Free
        </span>
      </div>
      {/* 
      Ejemplo de texto sobrante útil para despues
      <div className="w-52 border p-2 mb-5 ">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          Este es un texto muy largo que no cabe en el contenedor, por lo que se
          mostrará con puntos suspensivos al final.
        </p>
        <p className="whitespace-pre-wrap">
          Este es un texto muy largo que no cabe en el contenedor, por lo que se
          mostrará en varias líneas.
        </p>
      </div> */}
    </div>
  );
};

export default ListItemGame;
