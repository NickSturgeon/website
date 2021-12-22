import { Store } from "vuex";
import { State } from "../store";

export async function scrollToHash(hash: string) {
  const checkDelayMs = 500;
  const maxRetries = 10;
  let currentTry = 0;

  if (hash !== "") {
    var element = document.getElementById(hash.slice(1));
    while (element === null && currentTry++ < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, checkDelayMs));
      element = document.getElementById(hash.slice(1));
    }
    element?.scrollIntoView();
  }
}

export async function cacheCSV(store: Store<State>, keys: string[]): Promise<string[]> {
  const results: Promise<string>[] = [];
  keys.forEach((key) => results.push(store.dispatch("getSetCsvCache", key)));
  return Promise.all(results);
}

export function zip<T, U>(left: T[], right: U[]): [T, U][] {
  return left.map((l, i) => [l, right[i]]);
}
