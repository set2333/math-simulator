import SubVerbalCountingGenerator from "./generators/sub-verbal-counting";
import SumVerbalCountingGenerator from "./generators/sum-verbal-counting";
import { ExamplesGenerator, GeneratorsName } from "./types";

export const GENERATORS: Record<GeneratorsName, ExamplesGenerator> = {
  [SumVerbalCountingGenerator.generatorId]: new SumVerbalCountingGenerator(),
  [SubVerbalCountingGenerator.generatorId]: new SubVerbalCountingGenerator(),
}