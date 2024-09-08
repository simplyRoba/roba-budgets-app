import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Income } from '../../shared/income.model';
import { Observable } from 'rxjs';
import { BackendApiService } from '../../service/backend-api.service';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FixedBottomButtonGroupComponent } from '../../shared/fixed-bottom-button-group/fixed-bottom-button-group.component';

@Component({
  selector: 'roba-income',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    FixedBottomButtonGroupComponent,
    DatePipe,
  ],
  templateUrl: './income-list.component.html',
  styleUrl: './income-list.component.scss',
})
export class IncomeListComponent {
  private backendApiService = inject(BackendApiService);
  private activatedRoute = inject(ActivatedRoute);

  currentMonth: Date;
  $incomeList: Observable<Income[]>;

  constructor() {
    const params = this.activatedRoute.snapshot.params;
    if (params['year'] && params['month']) {
      this.currentMonth = new Date(+params['year'], +params['month'] - 1);
    } else {
      this.currentMonth = new Date();
    }

    this.$incomeList = this.backendApiService.loadIncomeList(
      this.currentMonth.getFullYear(),
      // JS's getMonth is zero indexed :(
      this.currentMonth.getMonth() + 1,
    );
  }

  sumIncome(incomeList: Income[]): number {
    return incomeList.reduce((sum, income) => sum + income.amountInCents, 0);
  }

  protected readonly faCopy = faCopy;
}
