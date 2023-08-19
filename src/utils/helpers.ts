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

// Separar Párrafos
export function separateByRegExp(str: string) {
  return str.split(/\r\n\r\n/g);
}

// Capitalizar las palabras
export function toCapitalCase(inputString: string) {
  const words = inputString.split(" ");
  const capitalCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalCaseWords.join(" ");
}
