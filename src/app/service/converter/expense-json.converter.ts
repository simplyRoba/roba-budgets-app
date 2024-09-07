import {Expense, ExpenseJson, ExpenseType} from "../../shared/expense.model";

export function convertExpense(expense: ExpenseJson): Expense {
  return {
    id: expense.id,
    title: expense.title,
    amountInCents: expense.amountInCents,
    dueDate: new Date(expense.dueDate),
    type: ExpenseType[expense.type as keyof typeof ExpenseType],
    categoryId: expense.categoryId,
    budgetId: expense.budgetId,
  } satisfies Expense;
}
