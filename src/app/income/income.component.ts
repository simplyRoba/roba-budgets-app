import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Income } from '../shared/income.model';
import { Observable, of, switchMap } from 'rxjs';
import { BackendApiService } from '../service/backend-api.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FixedBottomButtonGroupComponent } from '../shared/fixed-bottom-button-group/fixed-bottom-button-group.component';

@Component({
  selector: 'roba-income',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    FixedBottomButtonGroupComponent,
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent {
  private backendApiService = inject(BackendApiService);
  private activatedRoute = inject(ActivatedRoute);

  $selectedDate: Observable<Date>;
  $incomeList: Observable<Income[]>;

  constructor() {
    this.$selectedDate = this.activatedRoute.params.pipe(
      switchMap((params) => {
        if (params['year'] && params['month']) {
          return of(new Date(+params['year'], +params['month'] - 1));
        } else {
          return of(new Date());
        }
      }),
    );

    this.$incomeList = this.$selectedDate.pipe(
      switchMap((date) =>
        this.backendApiService.loadIncomeList(
          date.getFullYear(),
          // JS's getMonth is zero indexed :(
          date.getMonth() + 1,
        ),
      ),
    );
  }

  sumIncome(incomeList: Income[]): number {
    return incomeList.reduce((sum, income) => sum + income.amountInCents, 0);
  }

  protected readonly faCopy = faCopy;
}
