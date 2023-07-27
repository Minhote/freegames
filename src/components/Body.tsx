import MostPlayed from "./MostPlayed";
import RecentlyAdded from "./RecentlyAdded";
import Recomendations from "./Recomendations";

export default function () {
  return (
    <main className="px-20 py-2 ">
      <div className="flex flex-col gap-2 items-start">
        <Recomendations />
      </div>
      <div className="flex gap-3 flex-wrap">
        <RecentlyAdded />
        <MostPlayed />
      </div>
    </main>
  );
}
