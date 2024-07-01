import DivideCountingGenerator from "./generators/divide-counting";
import MulCountingGenerator from "./generators/mul-counting";
import SubCountingGenerator from "./generators/sub-counting";
import SumCountingGenerator from "./generators/sum-counting";
import { ExamplesGenerator, GeneratorsName } from "./types";

export const GENERATORS: Record<GeneratorsName, ExamplesGenerator> = {
  [DivideCountingGenerator.generatorId]: new DivideCountingGenerator(),
  [MulCountingGenerator.generatorId]: new MulCountingGenerator(),
  [SumCountingGenerator.generatorId]: new SumCountingGenerator(),
  [SubCountingGenerator.generatorId]: new SubCountingGenerator(),
}