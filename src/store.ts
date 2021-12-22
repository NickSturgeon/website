import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { constants } from "./utilities/constants";

export const key: InjectionKey<Store<State>> = Symbol();

export interface State {
  csvCache: {
    key: string;
    data: string;
  }[];
}

const cacheTimeoutMs: number = 5 * 60 * 1000; // 5m

export const GET_SET_CSV_CACHE = "getSetCsvCache";

const ADD_CSV_CACHE = "addCsvCache",
  REMOVE_CSV_CACHE = "removeCsvCache";

export const store = createStore<State>({
  state: {
    csvCache: [],
  },
  mutations: {
    [ADD_CSV_CACHE](state, { key, data }) {
      state.csvCache.push({ key, data });
    },
    [REMOVE_CSV_CACHE](state, key) {
      const index = state.csvCache.findIndex((c) => c.key === key);
      state.csvCache.splice(index, 1);
    },
  },
  actions: {
    [GET_SET_CSV_CACHE]: async (context, key) => {
      let cache = context.state.csvCache.find((c) => c.key === key);
      let data = cache?.data;

      if (cache === undefined) {
        data = await fetch(`${constants.resourceURL}/csv/${key}.csv`).then((res) => res.text());
        cache = context.state.csvCache.find((c) => c.key === key);
        if (cache === undefined) {
          context.commit(ADD_CSV_CACHE, { key, data });
          setTimeout(() => context.commit(REMOVE_CSV_CACHE, key), cacheTimeoutMs);
        } else {
          data = cache.data;
        }
      }

      return data!;
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
