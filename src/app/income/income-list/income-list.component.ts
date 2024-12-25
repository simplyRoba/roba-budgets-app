import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Income } from '../../shared/income.model';
import { Observable } from 'rxjs';
import { BackendApiService } from '../../service/backend-api.service';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FixedBottomContainerButtonGroupComponent } from '../../shared/components/fixed-bottom-container/fixed-bottom-container-button-group/fixed-bottom-container-button-group.component';
import { FixedBottomContainerComponent } from '../../shared/components/fixed-bottom-container/fixed-bottom-container.component';
import { ScrollContainerComponent } from '../../shared/components/scroll-container/scroll-container.component';
import { FixedBottomContainerSumRowComponent } from '../../shared/components/fixed-bottom-container/fixed-bottom-container-sum-row/fixed-bottom-container-sum-row.component';

@Component({
  selector: 'roba-income',
  imports: [
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    FixedBottomContainerButtonGroupComponent,
    FixedBottomContainerComponent,
    ScrollContainerComponent,
    FixedBottomContainerSumRowComponent,
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
}
