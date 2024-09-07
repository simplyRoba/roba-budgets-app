import { convertIncome } from './income-json.converter';
import { IncomeJson } from '../../shared/income.model';

describe('IncomeJsonConverter', () => {
  it('should convert', () => {
    const json = {
      id: 1,
      title: 'Test',
      amountInCents: 1000,
      dueDate: '2024-01-22',
    } satisfies IncomeJson;
    const result = convertIncome(json);
    expect(result).toEqual({
      id: 1,
      title: 'Test',
      amountInCents: 1000,
      dueDate: new Date('2024-01-22'),
    });
  });
});
