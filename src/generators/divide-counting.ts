import { ChechResults, ExamplesGenerator } from "../types";
import { generateId, random } from "../utils";

const MIN_OPERAND = 1;

class DivideCountingGenerator implements ExamplesGenerator {
  static readonly generatorId = 'divide-counting';
  
  readonly id = DivideCountingGenerator.generatorId;

  readonly options = {
    MAX_DIVIDEND: { label: 'Максимальное частное', defaultValue: 10 },
    FRACTION: { label: 'Размер дробной части частного', defaultValue: 0 },
  };
  
  get description() {
    return 'Деление';
  }

  generate(count: number, generateOptions: Record<string, number>) {
    return [...Array(count).keys()].reduce((acc, number) => {
      const id = generateId();
      const [minOperand, maxOperand] = [...Array(2)]
        .map(() => random(
          MIN_OPERAND,
          generateOptions.MAX_DIVIDEND || this.options.MAX_DIVIDEND.defaultValue,
          generateOptions.FRACTION || this.options.FRACTION.defaultValue,
        ))
        .sort((a, b) => a - b);

      return ({
        ...acc,
        [id]: {
          id,
          number,
          answer: maxOperand,
          exercise: `${maxOperand * minOperand} ${String.fromCharCode(247)} ${minOperand}`,
          checkResult: ChechResults.NotVerified,
        },
      });
    }, {});
  }
}

export default DivideCountingGenerator;
