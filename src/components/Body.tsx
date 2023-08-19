import MostPlayed from "./MostPlayed";
import RecentlyAdded from "./RecentlyAdded";
import Recomendations from "./Recomendations";

export default function Body() {
  return (
    <main className="px-20 py-2 bg-neutral ">
      <div className="flex flex-col gap-2 items-start my-3">
        <Recomendations />
      </div>
      <div className="flex flex-wrap gap-4 my-3">
        <RecentlyAdded />
        <MostPlayed />
        <div className="w-full grow flex justify-start items-center">
          <button className="bg-neutral border border-primary-content opacity-80 text-primary-content font-light text-xl tracking-wider py-1 px-3 rounded-md hover:opacity-100 flex items-center justify-center">
            More Games
          </button>
        </div>
      </div>
    </main>
  );
}
