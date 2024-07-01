import { ChechResults, ExamplesGenerator } from "../types";
import { generateId, random, round } from "../utils";

const MIN_OPERAND = 1;

class DivideCountingGenerator implements ExamplesGenerator {
  static readonly generatorId = 'divide-counting';
  
  readonly id = DivideCountingGenerator.generatorId;

  readonly options = {
    MAX_QUOTIENT: { label: 'Максимальное частное', defaultValue: 10 },
    FRACTION: { label: 'Размер дробной части делимого', defaultValue: 0 },
  };
  
  get description() {
    return 'Деление';
  }

  generate(count: number, generateOptions: Record<string, number>) {
    return [...Array(count).keys()].reduce((acc, number) => {
      const id = generateId();
      const fraction = generateOptions.FRACTION || this.options.FRACTION.defaultValue;
      const reducedFraction = Math.floor(fraction / 2);
      const [minOperand, maxOperand] = [...Array(2)]
        .map(() => random(
          MIN_OPERAND,
          (generateOptions.MAX_QUOTIENT || this.options.MAX_QUOTIENT.defaultValue) * 10**reducedFraction,
        ))
        .sort((a, b) => a - b);
      const dividend = (maxOperand * minOperand) / 10**fraction;

      return ({
        ...acc,
        [id]: {
          id,
          number,
          answer: round(dividend / (minOperand / 10**reducedFraction), fraction),
          exercise: `${dividend} ${String.fromCharCode(247)} ${minOperand / 10**reducedFraction}`,
          checkResult: ChechResults.NotVerified,
        },
      });
    }, {});
  }
}

export default DivideCountingGenerator;
