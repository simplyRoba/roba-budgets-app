import { Component, inject } from '@angular/core';
import { BackendApiService } from '../service/backend-api.service';
import { Observable, of, startWith, switchMap } from 'rxjs';
import { Income } from '../shared/income.model';
import { Summary } from '../shared/summary.model';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faChevronLeft, faChevronRight, faHome, faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, DatePipe, FaIconComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  private backendApiService = inject(BackendApiService);

  selectedDate: Observable<Date> = of(new Date());
  summary$: Observable<Summary>;

  constructor() {
    this.summary$ = this.selectedDate.pipe(
      switchMap((date) =>
        this.backendApiService
          .loadSummary(date.getFullYear(), date.getMonth())
          .pipe(
            startWith({
              month: 0,
              year: 0,
              totalIncomeInCents: 0,
              totalFixExpensesInCents: 0,
              totalFlexExpensesInCents: 0,
            } satisfies Summary),
          ),
      ),
    );
  }

  protected readonly faHome = faHome;
  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faPlus = faPlus;
  protected readonly faChevronRight = faChevronRight;
}
