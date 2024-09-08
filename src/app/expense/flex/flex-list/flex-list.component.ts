import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackendApiService } from '../../../service/backend-api.service';
import { Observable } from 'rxjs';
import { Expense, ExpenseType } from '../../../shared/expense.model';
import { FixedBottomContainerButtonGroupComponent } from '../../../shared/components/fixed-bottom-container/fixed-bottom-container-button-group/fixed-bottom-container-button-group.component';
import { FixedBottomContainerComponent } from '../../../shared/components/fixed-bottom-container/fixed-bottom-container.component';
import { ScrollContainerComponent } from '../../../shared/components/scroll-container/scroll-container.component';
import { FixedBottomContainerSumRowComponent } from '../../../shared/components/fixed-bottom-container/fixed-bottom-container-sum-row/fixed-bottom-container-sum-row.component';

@Component({
  selector: 'roba-flex-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    FaIconComponent,
    RouterLink,
    DatePipe,
    FixedBottomContainerButtonGroupComponent,
    FixedBottomContainerComponent,
    ScrollContainerComponent,
    FixedBottomContainerSumRowComponent,
  ],
  templateUrl: './flex-list.component.html',
  styleUrl: './flex-list.component.scss',
})
export class FlexListComponent {
  private backendApiService = inject(BackendApiService);
  private activatedRoute = inject(ActivatedRoute);

  currentMonth: Date;
  $flexExpenseList: Observable<Expense[]>;

  constructor() {
    const params = this.activatedRoute.snapshot.params;
    if (params['year'] && params['month']) {
      this.currentMonth = new Date(+params['year'], +params['month'] - 1);
    } else {
      this.currentMonth = new Date();
    }

    this.$flexExpenseList = this.backendApiService.loadExpenseList(
      ExpenseType.FLEX,
      this.currentMonth.getFullYear(),
      // JS's getMonth is zero indexed :(
      this.currentMonth.getMonth() + 1,
    );
  }

  sumExpense(expenseList: Expense[]): number {
    return expenseList.reduce((sum, expense) => sum + expense.amountInCents, 0);
  }
}
