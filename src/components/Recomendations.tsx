import axios from "axios";
import CardGame from "./CardGame";
import { useEffect, useState } from "react";
import { BASEURL, UNIQUEID } from "../api/url";
import { createOptions, randomNumber } from "../utils/helpers";
//Video URL ejemplo https://www.freetogame.com/g/470/videoplayback.webm

const optionsRecomendations = {
  method: "GET",
  url: BASEURL,
  headers: {
    "X-RapidAPI-Key": "a0a09286c0mshbf1e816d2904e1ap1d212cjsn4727a13316d8",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

async function fetchRecomendations() {
  const { data } = await axios.request(optionsRecomendations);
  return data;
}

async function fetchCardsGames(data: Array<any>) {
  const ids = new Set<number>();
  while (ids.size < 3) {
    const randomId = randomNumber(0, data.length - 1);
    ids.add(randomId);
  }

  const optionsCards = Array.from(ids).map((id) => {
    // return {
    //   method: "GET",
    //   url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
    //   params: { id: `${data[id].id}` },
    //   headers: {
    //     "X-RapidAPI-Key": "a0a09286c0mshbf1e816d2904e1ap1d212cjsn4727a13316d8",
    //     "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    //   },
    // };

    const result = createOptions({ id: `${data[id].id}` }, UNIQUEID);
    return result;
  });

  const reqs = optionsCards.map((options) => axios.request(options));
  const resp = await Promise.all(reqs);
  return resp.map((el) => el.data);
}

export default function Recomendations() {
  const [data, setData] = useState<Array<any> | null>(null);
  const [cardData, setCardData] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchRecomendations();
      setData(data);

      if (data) {
        const cardData = await fetchCardsGames(data);
        setCardData(cardData);
      }
    })();
  }, []);

  // Si data es nulo o tiene una longitud insuficiente, muestra un mensaje de carga.
  if (!data || data.length < 3) {
    return (
      <>
        <h2 className="font-bold">Personalized Recomendations</h2>
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center justify-center h-64">
              <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
          ))}
        </div>
      </>
    );
  }

  // Renderiza los componentes CardGame solo si los datos son válidos.
  return (
    <>
      <h2 className="font-bold">Personalized Recomendations</h2>
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
        {cardData.map((card) => (
          <CardGame key={card.id} {...card} />
        ))}
      </div>
    </>
  );
}
