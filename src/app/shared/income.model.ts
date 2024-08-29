export interface Income {
  id: number;
  title: string;
  amountInCents: number;
  dueDate: Date;
}

export interface IncomeJson {
  id: number;
  title: string;
  amountInCents: number;
  dueDate: string;
}
