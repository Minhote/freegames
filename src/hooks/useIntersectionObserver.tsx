import { useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = (
  callback: () => void,
  options?: IntersectionObserverOptions
) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [limit, setLimit] = useState<number>(20);

  const handleLimit = (num: number) => {
    setLimit((prev) => prev + num);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, options]);

  return { targetRef, limit, handleLimit };
};

export default useIntersectionObserver;
