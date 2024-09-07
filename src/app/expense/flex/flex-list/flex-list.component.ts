import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FixedBottomButtonGroupComponent } from '../../../shared/fixed-bottom-button-group/fixed-bottom-button-group.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackendApiService } from '../../../service/backend-api.service';
import { Observable } from 'rxjs';
import { Expense, ExpenseType } from '../../../shared/expense.model';

@Component({
  selector: 'roba-flex-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    FaIconComponent,
    FixedBottomButtonGroupComponent,
    RouterLink,
  ],
  templateUrl: './flex-list.component.html',
  styleUrl: './flex-list.component.scss',
})
export class FlexListComponent {
  private backendApiService = inject(BackendApiService);
  private activatedRoute = inject(ActivatedRoute);

  selectedDate: Date;
  $flexExpenseList: Observable<Expense[]>;

  constructor() {
    const params = this.activatedRoute.snapshot.params;
    if (params['year'] && params['month']) {
      this.selectedDate = new Date(+params['year'], +params['month'] - 1);
    } else {
      this.selectedDate = new Date();
    }

    this.$flexExpenseList = this.backendApiService.loadExpenseList(
      ExpenseType.FLEX,
      this.selectedDate.getFullYear(),
      // JS's getMonth is zero indexed :(
      this.selectedDate.getMonth() + 1,
    );
  }

  sumExpense(expenseList: Expense[]): number {
    return expenseList.reduce((sum, expense) => sum + expense.amountInCents, 0);
  }
}
