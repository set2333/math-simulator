import { makeAutoObservable } from "mobx";
import { Answer, ChechResults, Example, Id } from "../types";
import { RootStore } from "./index";

class ExamplesStore {
  rootStore
  examples: Record<Id, Example> = {};
  
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get result() {
    const examples = Object.values(this.examples);

    return examples.some(({ checkResult }) => checkResult !== ChechResults.NotVerified)
      ? `Верно решено ${examples.reduce((acc, { checkResult }) => acc + (checkResult === ChechResults.Correct ? 1 : 0), 0)} из ${examples.length} примеров.`
      : ''
  }

  generateExamples() {
    this.examples = Object.values(this.rootStore.generatorSettingsStore.settings).reduce<Record<Id, Example>>((acc, { generator, count }) => ({
      ...acc,
      ...generator.generate(count),
    }), {});
  }

  setUserAnswer(id: Id, userAnswer: Answer) {
    this.examples[id].userAnswer = userAnswer;
  }

  checkAnswers() {
    this.examples = Object.values(this.examples).reduce<Record<Id, Example>>((acc,  example) => ({
      ...acc,
      [example.id]: { ...example, checkResult: example.answer === example.userAnswer ? ChechResults.Correct : ChechResults.Incorrect },
    }), {});
  }
}

export default ExamplesStore;