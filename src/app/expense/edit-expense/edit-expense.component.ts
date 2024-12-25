import { Component, inject, OnDestroy } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FixedBottomContainerButtonGroupComponent } from '../../shared/components/fixed-bottom-container/fixed-bottom-container-button-group/fixed-bottom-container-button-group.component';
import { FixedBottomContainerComponent } from '../../shared/components/fixed-bottom-container/fixed-bottom-container.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ScrollContainerComponent } from '../../shared/components/scroll-container/scroll-container.component';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BackendApiService } from '../../service/backend-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  mergeMap,
  Observable,
  Subscription,
  toArray,
} from 'rxjs';
import { ExpenseType } from '../../shared/expense.model';
import { Category } from '../../shared/category.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'roba-edit-expense',
  imports: [
    FaIconComponent,
    FixedBottomContainerButtonGroupComponent,
    FixedBottomContainerComponent,
    ReactiveFormsModule,
    ScrollContainerComponent,
    AsyncPipe,
  ],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss',
})
export class EditExpenseComponent implements OnDestroy {
  private backendApiService = inject(BackendApiService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  type: ExpenseType;
  $categories: Observable<Category[]>;

  subscriptions: Subscription[] = [];

  form = new FormGroup({
    title: new FormControl(''),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    date: new FormControl(
      new Date().toISOString().slice(0, 10),
      Validators.required,
    ),
    category: new FormGroup({
      id: new FormControl(0, Validators.required),
      name: new FormControl('', Validators.required),
    }),
  });

  constructor() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.type =
      ExpenseType[
        this.activatedRoute.snapshot.data[
          'type'
        ].toUpperCase() as keyof typeof ExpenseType
      ];

    this.$categories = this.backendApiService.loadCategories();

    if (this.id) {
      this.subscriptions.push(
        combineLatest([
          this.$categories.pipe(
            mergeMap((categories) => categories),
            toArray(),
          ),
          this.backendApiService.loadExpense(this.id, this.type),
        ]).subscribe(([categories, expense]) => {
          this.form.setValue({
            title: expense.title,
            amount: expense.amountInCents / 100,
            date: expense.dueDate.toISOString().slice(0, 10),
            category: {
              id: expense.categoryId,
              name: categories.find((c) => c.id === expense.categoryId)?.name!,
            },
          });
        }),
      );
    }
  }

  delete() {
    if (this.id) {
      this.subscriptions.push(
        this.backendApiService.deleteIncome(this.id).subscribe(() => {
          this.router.navigate([this.type.toLowerCase()]).then();
        }),
      );
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }
    if (this.id) {
      this.subscriptions.push(
        this.backendApiService
          .updateExpense(this.id, {
            title: this.form.value.title!,
            amountInCents: this.form.value.amount! * 100,
            dueDate: new Date(this.form.value.date!),
            categoryId: this.form.value.category?.id!,
            budgetId: null, // TODO will be implemented later
            type: this.type,
          })
          .subscribe((expense) =>
            this.router
              .navigate([
                this.type.toLowerCase(),
                expense.dueDate.getFullYear(),
                expense.dueDate.getMonth() + 1,
              ])
              .then(),
          ),
      );
    } else {
      this.subscriptions.push(
        this.backendApiService
          .saveExpense({
            title: this.form.value.title!,
            amountInCents: this.form.value.amount! * 100,
            dueDate: new Date(this.form.value.date!),
            categoryId: this.form.value.category?.id!,
            budgetId: null, // TODO will be implemented later
            type: this.type,
          })
          .subscribe((expense) =>
            this.router
              .navigate([
                this.type.toLowerCase(),
                expense.dueDate.getFullYear(),
                expense.dueDate.getMonth() + 1,
              ])
              .then(),
          ),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected readonly faSave = faSave;
  protected readonly faTrash = faTrash;
}
