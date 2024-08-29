export interface Summary {
  month: number;
  year: number;
  totalIncomeInCents: number;
  totalFixExpensesInCents: number;
  totalFlexExpensesInCents: number;
  budgets: BudgetSummary[];
}

export interface BudgetSummary {
  name: String;
  totalSavedAmountInCents: number;
  totalExpensesInCents: number;
}
