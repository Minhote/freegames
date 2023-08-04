// import axios from "axios";
// import { useEffect, useState } from "react";
// import { createOptions } from "../utils/helpers";
// import { InfoSingleGame, sortedBy } from "../types/types";
// import { BASEURL } from "../api/url";

// const optionsRecently = createOptions(
//   { "sort-by": sortedBy.Popularity },
//   BASEURL
// );

// const LISTLENGTH = 4;

// export default function MostPlayed() {
//   const [mostPlayed, setMostPlayed] = useState<Array<InfoSingleGame>>([]);
//   useEffect(() => {
//     (async () => {
//       const { data } = await axios.request(optionsRecently);
//       const arr = data.slice(0, LISTLENGTH);
//       setMostPlayed(arr);
//     })();
//   }, []);

//   console.log(mostPlayed);
//   return (
//     <>
//     <div className="flex flex-col gap-4"></div>
//       <h2 className="text-lg font-semibold text-neutral-content">
//         Most MostPlayed
//       </h2>
//       <div className="flex-initial w-[min(20rem,100%)] flex flex-wrap gap-2">
//         {mostPlayed.map((el) => {
//           return (
//             <div className="relative h-20 group">
//               <picture className="h-full w-full">
//                 <img src={el.thumbnail} alt={el.title} />
//               </picture>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }
