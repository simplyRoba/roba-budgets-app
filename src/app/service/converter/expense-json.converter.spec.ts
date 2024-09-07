import { convertExpense } from './expense-json.converter';
import { ExpenseJson, ExpenseType } from '../../shared/expense.model';

describe('convertExpense', () => {
  it('should convert ExpenseJson to Expense', () => {
    const expenseJson: ExpenseJson = {
      id: 1,
      title: 'Groceries',
      amountInCents: 5000,
      dueDate: '2023-10-01T00:00:00Z',
      type: 'FIX',
      categoryId: 2,
      budgetId: 3,
    };

    const expense = convertExpense(expenseJson);

    expect(expense.id).toBe(expenseJson.id);
    expect(expense.title).toBe(expenseJson.title);
    expect(expense.amountInCents).toBe(expenseJson.amountInCents);
    expect(expense.dueDate).toEqual(new Date(expenseJson.dueDate));
    expect(expense.type).toBe(ExpenseType[expenseJson.type as keyof typeof ExpenseType]);
    expect(expense.categoryId).toBe(expenseJson.categoryId);
    expect(expense.budgetId).toBe(expenseJson.budgetId);
  });
});
