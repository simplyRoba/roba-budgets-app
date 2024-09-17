import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackendApiService } from '../../service/backend-api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';
import { FixedBottomContainerButtonGroupComponent } from '../../shared/components/fixed-bottom-container/fixed-bottom-container-button-group/fixed-bottom-container-button-group.component';
import { ScrollContainerComponent } from '../../shared/components/scroll-container/scroll-container.component';
import { FixedBottomContainerComponent } from '../../shared/components/fixed-bottom-container/fixed-bottom-container.component';

@Component({
  selector: 'roba-edit-income',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FaIconComponent,
    FixedBottomContainerButtonGroupComponent,
    ScrollContainerComponent,
    FixedBottomContainerComponent,
  ],
  templateUrl: './edit-income.component.html',
  styleUrl: './edit-income.component.scss',
})
export class EditIncomeComponent implements OnDestroy {
  private backendApiService = inject(BackendApiService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;

  subscriptions: Subscription[] = [];

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    date: new FormControl(
      new Date().toISOString().slice(0, 10),
      Validators.required,
    ),
  });

  constructor() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.subscriptions.push(
        this.backendApiService.loadIncome(this.id).subscribe((income) => {
          this.form.setValue({
            title: income.title,
            amount: income.amountInCents / 100,
            date: income.dueDate.toISOString().slice(0, 10),
          });
        }),
      );
    }
  }

  delete() {
    if (this.id) {
      this.subscriptions.push(
        this.backendApiService.deleteIncome(this.id).subscribe(() => {
          this.router.navigate(['/income']).then();
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
          .updateIncome(this.id, {
            title: this.form.value.title!,
            amountInCents: this.form.value.amount! * 100,
            dueDate: new Date(this.form.value.date!),
          })
          .subscribe((income) =>
            this.router
              .navigate([
                'income',
                income.dueDate.getFullYear(),
                income.dueDate.getMonth() + 1,
              ])
              .then(),
          ),
      );
    } else {
      this.subscriptions.push(
        this.backendApiService
          .saveIncome({
            title: this.form.value.title!,
            amountInCents: this.form.value.amount! * 100,
            dueDate: new Date(this.form.value.date!),
          })
          .subscribe((income) =>
            this.router
              .navigate([
                'income',
                income.dueDate.getFullYear(),
                income.dueDate.getMonth() + 1,
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
