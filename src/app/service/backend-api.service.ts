import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Income, IncomeJson } from '../shared/income.model';
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

  public loadIncomeList(): Observable<Income[]> {
    return this.httpClient
      .get<IncomeJson[]>(`${environment.host}/api/v1/income`)
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
}
