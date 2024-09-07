import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Income, IncomeCreate, IncomeJson } from '../shared/income.model';
import { environment } from '../../environments/environment';
import { Summary } from '../shared/summary.model';
import { convertIncome } from './converter/income-json.converter';
import {Expense, ExpenseJson, ExpenseType} from "../shared/expense.model";
import {convertExpense} from "./converter/expense-json.converter";

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  private httpClient = inject(HttpClient);

  public loadSummary(year: number, month: number): Observable<Summary> {
    return this.httpClient.get<Summary>(
      `${environment.host}/api/v1/summary/year/${year}/month/${month}`,
    );
  }

  public loadIncomeList(year: number, month: number): Observable<Income[]> {
    return this.httpClient
      .get<
        IncomeJson[]
      >(`${environment.host}/api/v1/income/year/${year}/month/${month}`)
      .pipe(map((jsonList) => jsonList.map(convertIncome)),);
  }

  public loadIncome(id: number): Observable<Income> {
    return this.httpClient
      .get<IncomeJson>(`${environment.host}/api/v1/income/${id}`)
      .pipe(map(convertIncome));
  }

  public saveIncome(income: IncomeCreate): Observable<Income> {
    return this.httpClient
      .post<IncomeJson>(`${environment.host}/api/v1/income`, income)
      .pipe(map(convertIncome));
  }

  public updateIncome(id: number, income: IncomeCreate): Observable<Income> {
    return this.httpClient
      .put<IncomeJson>(`${environment.host}/api/v1/income/${id}`, income)
      .pipe(map(convertIncome));
  }

  public deleteIncome(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.host}/api/v1/income/${id}`,
    );
  }

  public loadExpenseList(type: ExpenseType, year: number, month: number): Observable<Expense[]> {
    return this.httpClient
      .get<ExpenseJson[]>(`${environment.host}/api/v1/expense/type/${type.toLowerCase()}/year/${year}/month/${month}`)
      .pipe(map((jsonList) => jsonList.map(convertExpense)));
  }
}
