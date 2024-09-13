import {Component, inject, OnDestroy} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  FixedBottomContainerButtonGroupComponent
} from "../../shared/components/fixed-bottom-container/fixed-bottom-container-button-group/fixed-bottom-container-button-group.component";
import {
  FixedBottomContainerComponent
} from "../../shared/components/fixed-bottom-container/fixed-bottom-container.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  ScrollContainerComponent
} from "../../shared/components/scroll-container/scroll-container.component";
import {faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {BackendApiService} from "../../service/backend-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ExpenseType} from "../../shared/expense.model";

@Component({
  selector: 'roba-edit-expense',
  standalone: true,
  imports: [
    FaIconComponent,
    FixedBottomContainerButtonGroupComponent,
    FixedBottomContainerComponent,
    ReactiveFormsModule,
    ScrollContainerComponent
  ],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss'
})
export class EditExpenseComponent implements OnDestroy {
  private backendApiService = inject(BackendApiService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  type: string;

  subscriptions: Subscription[] = [];

  form = new FormGroup({
    title: new FormControl(''),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    date: new FormControl(
      new Date().toISOString().slice(0, 10),
      Validators.required,
    ),
    category: new FormControl(0, Validators.required)
  });

  constructor() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.type = this.activatedRoute.snapshot.data['type'];

    if (this.id) {
      this.subscriptions.push(
        this.backendApiService.loadExpense(this.id).subscribe((expense) => {
          this.form.setValue({
            title: expense.title,
            amount: expense.amountInCents / 100,
            date: expense.dueDate.toISOString().slice(0, 10),
            category: expense.categoryId
          });
        }),
      );
    }
  }

  delete() {
    if (this.id) {
      this.subscriptions.push(
        this.backendApiService.deleteIncome(this.id).subscribe(() => {
          this.router.navigate([`/${this.type}`]).then(); // TODO navigate to right expense type
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
          categoryId: this.form.value.category!,
          budgetId: null, // TODO will be implemented later
          type: ExpenseType[this.type.toUpperCase() as keyof typeof ExpenseType],
        })
        .subscribe((expense) =>
          this.router
          .navigate([
            `/${this.type}/${expense.dueDate.getFullYear()}/${expense.dueDate.getMonth() + 1}`,
          ]) // TODO navigate to right expense type
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
          categoryId: this.form.value.category!,
          budgetId: null, // TODO will be implemented later
          type: ExpenseType[this.type.toUpperCase() as keyof typeof ExpenseType],
        })
        .subscribe((expense) =>
          this.router
          .navigate([
            `/${this.type}/${expense.dueDate.getFullYear()}/${expense.dueDate.getMonth() + 1}`,
          ]) // TODO navigate to right expense type
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
