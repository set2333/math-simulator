import { ChechResults, ExamplesGenerator } from "../types";
import { generateId, random } from "../utils";

const MIN_OPERAND = 1;
const MAX_OPERAND = 10;

class SubVerbalCountingGenerator implements ExamplesGenerator {
  static readonly generatorId = 'sub-verbal-counting';

  readonly id = SubVerbalCountingGenerator.generatorId;
  
  get description() {
    return 'Вычитание. Устный счет.';
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
          answer: Math.max(operand1, operand2) - Math.min(operand1, operand2),
          exercise: `${Math.max(operand1, operand2)} - ${Math.min(operand1, operand2)}`,
          checkResult: ChechResults.NotVerified,
        },
      });
    }, {});
  }
}

export default SubVerbalCountingGenerator;
