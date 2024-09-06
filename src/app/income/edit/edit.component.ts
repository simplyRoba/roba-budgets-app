import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BackendApiService} from "../../service/backend-api.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  private backendApiService = inject(BackendApiService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router)

  id: number | null = null;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.required,),
    date: new FormControl(new Date().toISOString().slice(0, 10), Validators.required),
  });

  constructor() {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log('ID:', this.id);
    if (this.id) {
      // TODO is subscription necessary / the right way to do it?
      this.backendApiService.loadIncome(this.id).subscribe(income => {
        this.form.setValue({
          title: income.title,
          amount: income.amountInCents / 100,
          date: income.dueDate.toISOString().slice(0, 10),
        });
      });
    }
  }

  submit() {
    console.log('FORM:', this.form.value);

    if (this.id) {
      // TODO handle nullability?!
      // TODO is subscription necessary / the right way to do it?
      this.backendApiService.updateIncome(this.id,{
        title: this.form.value.title!,
        amountInCents: this.form.value.amount! * 100,
        dueDate: this.form.value.date!,
      }).subscribe(
        () => this.router.navigate(['/income']).then()
      );
    } else {
      // TODO handle nullability?!
      // TODO is subscription necessary / the right way to do it?
      this.backendApiService.saveIncome({
        title: this.form.value.title!,
        amountInCents: this.form.value.amount! * 100,
        dueDate: this.form.value.date!,
      }).subscribe(
        () => this.router.navigate(['/income']).then()
      );
    }
  }
}
