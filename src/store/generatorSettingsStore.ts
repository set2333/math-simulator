import { makeAutoObservable } from "mobx";
import { generateId } from "../utils";
import { GeneratorSettings, Id } from "../types";
import { RootStore } from "./index";

class GeneratorSettingsStore {
  rootStore
  settings: Record<Id, GeneratorSettings> = {};
  
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  addSetting(setting: Omit<GeneratorSettings, 'id'>) {
    const id = generateId();
    this.settings[id] = ({ ...setting, id });
  }

  editSetting({ id, ...value }: GeneratorSettings) {
    this.settings[id] = ({ id, ...value });
  }
}

export default GeneratorSettingsStore;