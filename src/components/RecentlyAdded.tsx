import axios from "axios";
import { useEffect, useState } from "react";
import { createOptions } from "../utils/helpers";
import { BASEURL } from "../api/url";
import { InfoSingleGame, sortedBy } from "../types/types";
import ListItemGame from "./ListItemGame";

const optionsRecently = createOptions(
  { "sort-by": sortedBy.ReleaseDate },
  BASEURL
);

const LISTLENGTH = 7;

export default function RecentlyAdded() {
  const [recentlyAdded, setRecentlyAdded] = useState<Array<InfoSingleGame>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.request(optionsRecently);
      const arr = data.slice(0, LISTLENGTH);
      setRecentlyAdded(arr);
    })();
  }, [LISTLENGTH]);

  return (
    <div className="flex flex-col gap-1 flex-1 flex-wrap w-[min(26rem,100%)]">
      <h2 className="text-lg font-semibold text-neutral-content w-full">
        Recently Added
      </h2>
      <div className="flex flex-col w-full flex-wrap gap-5">
        {recentlyAdded.map((el) => (
          <ListItemGame key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
}
