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

export type ExamplesGeneratorOption = {
  label: string;
  defaultValue: number;
}

export type ExamplesGenerator = {
  id: GeneratorsName;
  options: Record<string, ExamplesGeneratorOption>;
  description: string;
  generate: (count: number, generateOptions: Record<string, number>) => Record<Id, Example>;
}

export type GeneratorsName = typeof SumVerbalCountingGenerator.generatorId | typeof SubVerbalCountingGenerator.generatorId;

export type GeneratorSettings = {
  id: Id,
  count: number;
  generator: ExamplesGenerator;
  options: Record<string, number>;
}

export enum ChechResults {
  Correct,
  Incorrect,
  NotVerified,
}