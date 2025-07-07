import { useSyncExternalStore } from 'react';

type StoreSubscriber<Value> = (state: Value) => void;

export interface Store<Value> {
  getState: () => Value;
  setState: (value: Value | ((prev: Value) => Value)) => void;
  subscribe: (callback: StoreSubscriber<Value>) => () => void;
}

export function createStore<Value extends Record<string, any>>(
  initialState: Value,
): Store<Value> {
  let state = initialState;
  const listeners = new Set<StoreSubscriber<Value>>();

  return {
    getState: () => state,
    setState: (value) => {
      state = typeof value === 'function' ? value(state) : value;
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };
}

export function useStore<TStore extends Store<any>>(store: TStore) {
  return useSyncExternalStore(
    store.subscribe,
    () => store.getState(),
    () => store.getState(),
  );
}
