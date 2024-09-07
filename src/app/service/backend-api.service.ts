import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Income, IncomeCreate, IncomeJson } from '../shared/income.model';
import { environment } from '../../environments/environment';
import { Summary } from '../shared/summary.model';

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
      .pipe(
        map((jsonList) => {
          return jsonList.map((jsonItem) => {
            return {
              id: jsonItem.id,
              title: jsonItem.title,
              amountInCents: jsonItem.amountInCents,
              dueDate: new Date(jsonItem.dueDate),
            } satisfies Income;
          });
        }),
      );
  }

  public loadIncome(id: number): Observable<Income> {
    return this.httpClient
      .get<IncomeJson>(`${environment.host}/api/v1/income/${id}`)
      .pipe(
        map((jsonItem) => {
          return {
            id: jsonItem.id,
            title: jsonItem.title,
            amountInCents: jsonItem.amountInCents,
            dueDate: new Date(jsonItem.dueDate),
          } satisfies Income;
        }),
      );
  }

  public saveIncome(income: IncomeCreate): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.host}/api/v1/income`,
      income,
    );
  }

  public updateIncome(id: number, income: IncomeCreate): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.host}/api/v1/income/${id}`,
      income,
    );
  }
}
