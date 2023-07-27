import { RequestOptions } from "../types/types";

// Crear una función para obtener las opciones personalizadas
export function createOptions<K extends string, V, T extends string>(
  params: Record<K, V>,
  url: T
): RequestOptions<K, V, T> {
  return {
    method: "GET",
    url,
    params,
    headers: {
      "X-RapidAPI-Key": "a0a09286c0mshbf1e816d2904e1ap1d212cjsn4727a13316d8",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
}

// Crear un número random
export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
