import { createContext } from "react";
import ExamplesStore from "./examplesStore";
import GeneratorSettingsStore from "./generatorSettingsStore";

class Store {
  examplesStore
  generatorSettingsStore

  constructor() {
    this.examplesStore = new ExamplesStore(this);
    this.generatorSettingsStore = new GeneratorSettingsStore(this);
  }
}

export const store = new Store();

export const StoreContext = createContext(store);

export type RootStore = Store;