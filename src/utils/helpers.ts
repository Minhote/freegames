import axios from "axios";
import { BASEURL, FILTERURL } from "../api/url";
import {
  RequestOptions,
  fetchFilterParamsWithTag,
  fetchFilterParamsWithCategory,
  platform,
} from "../types/types";

// Crear una función para obtener las opciones personalizadas
export function createOptions<
  K extends string,
  V extends string,
  T extends string
>(params: Record<K, V>, url: T): RequestOptions<K, V, T> {
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
export function separateByRegExp(str: string, regexp: RegExp) {
  return str.split(regexp);
}

// Capitalizar las palabras
export function toCapitalCase(inputString: string) {
  const words = inputString.split(" ");
  const capitalCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalCaseWords.join(" ");
}

// Fetch AllGames, BrowserGanes, PCGames
export async function fetchFilter(
  params: fetchFilterParamsWithTag | fetchFilterParamsWithCategory,
  // params: Record<keyof fetchFilterParams, string | undefined>,
  search: string
) {
  console.log(params, params != null, search === "");
  if (params === null && search.length > 0) {
    const sortKeyAndValue = separateByRegExp(location.search, /[\?\=]/g).slice(
      1
    );
    const optionsFilter = createOptions(
      { platform: platform.All, [sortKeyAndValue[0]]: sortKeyAndValue[1] },
      BASEURL
    );
    const { data } = await axios.request(optionsFilter);
    return data;
  } else if (
    params !== null &&
    // Object.entries(params).length === 1 &&
    search === "" &&
    Object.values(params).filter((el) => el != undefined).length === 1
  ) {
    const paramsValue = Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
    const optionsFilter = createOptions(paramsValue, BASEURL);
    const { data } = await axios.request(optionsFilter);
    return data;
  } else if (params !== null && search.length === 0) {
    if (Object.keys(params).includes("category")) {
      const optionsFilter = createOptions(
        {
          platform: Object.values(params)[0],
          category: Object.values(params)[1],
        },
        BASEURL
      );
      console.log(optionsFilter);
      const { data } = await axios.request(optionsFilter);
      return data;
    } else {
      const optionsFilter = createOptions(
        { platform: Object.values(params)[0], tag: Object.values(params)[1] },
        FILTERURL
      );
      const { data } = await axios.request(optionsFilter);
      return data;
    }
  } else if (params !== null && search !== "") {
    console.log("Acá con path de 1 y de 2");
    const paramsValue = Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

    const searchKeyAndValue = separateByRegExp(search, /[\?\=]/g).slice(1);
    paramsValue[searchKeyAndValue[0]] = searchKeyAndValue[1];
    const URL = paramsValue.tag ? FILTERURL : BASEURL;
    const optionsFilter = createOptions(paramsValue, URL);
    console.log(paramsValue, URL, optionsFilter);
    const { data } = await axios.request(optionsFilter);
    return data;
  }
}
