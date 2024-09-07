import { Income, IncomeJson } from '../../shared/income.model';

export function convertIncome(income: IncomeJson): Income {
  return {
    id: income.id,
    title: income.title,
    amountInCents: income.amountInCents,
    dueDate: new Date(income.dueDate),
  } satisfies Income;
}
