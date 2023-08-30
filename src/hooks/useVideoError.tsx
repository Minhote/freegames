import { useState } from "react";

interface VideoErrorHook {
  videoError: boolean;
  setErrorTrue: () => void;
  setErrorFalse: () => void;
}

const useVideoError = (): VideoErrorHook => {
  const [videoError, setVideoError] = useState(false);

  const setErrorTrue = () => {
    setVideoError(true);
  };

  const setErrorFalse = () => {
    setVideoError(false);
  };

  return {
    videoError,
    setErrorTrue,
    setErrorFalse,
  };
};

export default useVideoError;
