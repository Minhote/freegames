import { useNavigate } from "react-router-dom";
import useVideoError from "../hooks/useVideoError";

interface PosterProps {
  id: number;
  title: string;
  thumbnail: string;
  height: string;
}

const Poster = ({ id, title, thumbnail, height }: PosterProps) => {
  const { videoError, setErrorTrue, setErrorFalse } = useVideoError();
  const navigate = useNavigate();

  return (
    <div
      className={`relative ${height} group rounded-md overflow-hidden flex-wrap transition-all duration-500 hover:scale-105`}
      onClick={() =>
        navigate(`/${title.replace(/ /g, "-").toLowerCase()}`, {
          state: { id },
        })
      }
    >
      <picture className="inline-block h-full w-full">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full group-hover:opacity-0"
        />
      </picture>
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
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full absolute inset-0"
        />
      )}
      <span className="absolute bottom-2 right-2 py-2 px-3 bg-base-100 text-primary font-bold rounded-md cursor-default group-hover:opacity-0">
        Free
      </span>
    </div>
  );
};

export default Poster;
