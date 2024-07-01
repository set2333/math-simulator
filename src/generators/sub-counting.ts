import { ChechResults, ExamplesGenerator } from "../types";
import { generateId, random } from "../utils";

const MIN_OPERAND = 1;

class SubCountingGenerator implements ExamplesGenerator {
  static readonly generatorId = 'sub-verbal-counting';

  readonly id = SubCountingGenerator.generatorId;

  readonly options = {
    MAX_REDUCED: { label: 'Максимальное уменьшаемое', defaultValue: 10 },
    FRACTION: { label: 'Размер дробной части', defaultValue: 0 },
  };
  
  get description() {
    return 'Вычитание';
  }

  generate(count: number, generateOptions: Record<string, number>) {
    return [...Array(count).keys()].reduce((acc, number) => {
      const id = generateId();
      const [minOperand, maxOperand] = [...Array(2)]
        .map(() => random(
          MIN_OPERAND,
          generateOptions.MAX_REDUCED || this.options.MAX_REDUCED.defaultValue,
          generateOptions.FRACTION || this.options.FRACTION.defaultValue,
        ))
        .sort((a, b) => a - b);

      return ({
        ...acc,
        [id]: {
          id,
          number,
          answer: maxOperand - minOperand,
          exercise: `${maxOperand} - ${minOperand}`,
          checkResult: ChechResults.NotVerified,
        },
      });
    }, {});
  }
}

export default SubCountingGenerator;
