import SubVerbalCountingGenerator from "./generators/sub-verbal-counting";
import SumVerbalCountingGenerator from "./generators/sum-verbal-counting";

export type Answer = number;

type Exercise = string;

export type Id = string;

export type Example = {
  id: Id;
  number: number;
  answer: Answer;
  userAnswer?: Answer;
  exercise: Exercise;
  checkResult: ChechResults;
};

export type ExamplesGenerator = {
  id: GeneratorsName;
  description: string;
  generate: (count: number) => Record<Id, Example>;
}

export type GeneratorsName = typeof SumVerbalCountingGenerator.generatorId | typeof SubVerbalCountingGenerator.generatorId;

export type GeneratorSettings = {
  id: Id,
  count: number;
  generator: ExamplesGenerator;
}

export enum ChechResults {
  Correct,
  Incorrect,
  NotVerified,
}