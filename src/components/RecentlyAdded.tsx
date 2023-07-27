import axios from "axios";
import { useEffect, useState } from "react";
import { createOptions } from "../utils/helpers";
import { BASEURL } from "../api/url";
import { InfoSingleGame, sortedBy } from "../types/types";

const optionsRecently = createOptions(
  { "sort-by": sortedBy.ReleaseDate },
  BASEURL
);

const LISTLENGTH = 10;

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
    <div className="flex-1 basis-96 ">
      <h2 className="text-lg font-semibold text-base-content">
        Recently Added
      </h2>
      <ul>
        {recentlyAdded.map((el) => {
          return <li key={el.id}>{el.title}</li>;
        })}
      </ul>
    </div>
  );
}
