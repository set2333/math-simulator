import { ChechResults, ExamplesGenerator } from "../types";
import { generateId, random, round } from "../utils";

const MIN_OPERAND = 1;

class SumVerbalCountingGenerator implements ExamplesGenerator {
  static readonly generatorId = 'sum-verbal-counting';
  
  readonly id = SumVerbalCountingGenerator.generatorId;

  readonly options = {
    MAX_RESULT: { label: 'Максимальный результат', defaultValue: 10 },
    FRACTION: { label: 'Размер дробной части', defaultValue: 0 },
  };
  
  get description() {
    return 'Сложение';
  }

  generate(count: number, generateOptions: Record<string, number>) {
    return [...Array(count).keys()].reduce((acc, number) => {
      const id = generateId();
      const [minOperand, maxOperand] = [...Array(2)]
        .map(() => random(
          MIN_OPERAND,
          generateOptions.MAX_RESULT || this.options.MAX_RESULT.defaultValue,
          generateOptions.FRACTION || this.options.FRACTION.defaultValue,
        ))
        .sort((a, b) => a - b);

      return ({
        ...acc,
        [id]: {
          id,
          number,
          answer: maxOperand,
          exercise: `${round(maxOperand - minOperand, generateOptions.FRACTION || this.options.FRACTION.defaultValue)} + ${minOperand}`,
          checkResult: ChechResults.NotVerified,
        },
      });
    }, {});
  }
}

export default SumVerbalCountingGenerator;
