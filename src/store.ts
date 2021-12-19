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

export const store = createStore<State>({
  state: {
    csvCache: [],
  },
  mutations: {
    addCsvCache(state, { key, data }) {
      state.csvCache.push({ key, data });
    },
    removeCsvCache(state, key) {
      const index = state.csvCache.findIndex((c) => c.key === key);
      state.csvCache.splice(index, 1);
    },
  },
  actions: {
    getSetCsvCache: async (context, key) => {
      const busted = undefined;
      const cache = context.state.csvCache.find((c) => c.key === key);
      let data = cache?.data;

      if (cache === busted) {
        data = await fetch(`${constants.resourceURL}/csv/${key}.csv`).then((res) => res.text());
        context.commit("addCsvCache", { key, data });
        setTimeout(() => context.commit("removeCsvCache", key), cacheTimeoutMs);
      }

      return data!;
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
