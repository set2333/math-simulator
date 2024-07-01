import { ChechResults, ExamplesGenerator } from "../types";
import { generateId, random } from "../utils";

const MIN_OPERAND = 1;

class MulCountingGenerator implements ExamplesGenerator {
  static readonly generatorId = 'mul-counting';
  
  readonly id = MulCountingGenerator.generatorId;

  readonly options = {
    MAX_MULTIPLIER: { label: 'Максимальный множитель', defaultValue: 10 },
    FRACTION: { label: 'Размер дробной части', defaultValue: 0 },
  };
  
  get description() {
    return 'Умножение';
  }

  generate(count: number, generateOptions: Record<string, number>) {
    return [...Array(count).keys()].reduce((acc, number) => {
      const id = generateId();
      const [operand1, operand2] = [...Array(2)]
        .map(() => random(
          MIN_OPERAND,
          generateOptions.MAX_MULTIPLIER || this.options.MAX_MULTIPLIER.defaultValue,
          generateOptions.FRACTION || this.options.FRACTION.defaultValue,
        ))

      return ({
        ...acc,
        [id]: {
          id,
          number,
          answer: operand1 * operand2,
          exercise: `${operand1} ${String.fromCharCode(215)} ${operand2}`,
          checkResult: ChechResults.NotVerified,
        },
      });
    }, {});
  }
}

export default MulCountingGenerator;
