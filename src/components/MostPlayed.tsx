import axios from "axios";
import { useEffect, useState } from "react";
import { createOptions } from "../utils/helpers";
import { InfoSingleGame, sortedBy } from "../types/types";
import { BASEURL } from "../api/url";
import { Poster } from ".";

const optionsRecently = createOptions(
  { "sort-by": sortedBy.Relevance },
  BASEURL
);

const LISTLENGTH = 4;

export default function MostPlayed() {
  const [mostPlayed, setMostPlayed] = useState<Array<InfoSingleGame>>([]);

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
            <Poster
              id={el.id}
              key={el.id}
              title={el.title}
              thumbnail={el.thumbnail}
              height="h-[13.5rem]"
            />
          );
        })}
      </div>
    </div>
  );
}
