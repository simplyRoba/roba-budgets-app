export interface Expense {
  id: number;
  title: string | null;
  amountInCents: number;
  dueDate: Date;
  type: ExpenseType;
  categoryId: number;
  budgetId: number | null;
}

export enum ExpenseType {
  FIX = 'FIX',
  FLEX = 'FLEX',
  BUDGET = 'BUDGET',
}

export interface ExpenseCreate {
  title: string | null;
  amountInCents: number;
  dueDate: Date;
  type: ExpenseType;
  categoryId: number;
  budgetId: number | null;
}

export interface ExpenseUpdate {
  title: string | null;
  amountInCents: number;
  dueDate: Date;
  type: ExpenseType;
  categoryId: number;
  budgetId: number | null;
}

export interface ExpenseJson {
  id: number;
  title: string | null;
  amountInCents: number;
  dueDate: string;
  type: string;
  categoryId: number;
  budgetId: number | null;
}
