import { ChechResults, ExamplesGenerator } from "../types";
import { generateId, random } from "../utils";

const MIN_OPERAND = 1;
const MAX_OPERAND = 10;

class SumVerbalCountingGenerator implements ExamplesGenerator {
  static readonly generatorId = 'sum-verbal-counting';
  
  readonly id = SumVerbalCountingGenerator.generatorId;
  
  get description() {
    return 'Сложение. Устный счет.';
  }

  generate(count: number) {
    return [...Array(count).keys()].reduce((acc, number) => {
      const id = generateId();
      const operand1 = random(MIN_OPERAND, MAX_OPERAND);
      const operand2 = random(MIN_OPERAND, MAX_OPERAND);

      return ({
        ...acc,
        [id]: {
          id,
          number,
          answer: operand1 + operand2,
          exercise: `${operand1} + ${operand2}`,
          checkResult: ChechResults.NotVerified,
        },
      });
    }, {});
  }
}

export default SumVerbalCountingGenerator;
