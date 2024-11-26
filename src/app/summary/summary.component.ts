import { Component, inject } from '@angular/core';
import { BackendApiService } from '../service/backend-api.service';
import { Observable, of, switchMap } from 'rxjs';
import { Summary } from '../shared/summary.model';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faGear,
  faPlus,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'roba-summary',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, FaIconComponent, RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  private backendApiService = inject(BackendApiService);
  private activatedRoute = inject(ActivatedRoute);

  $selectedDate: Observable<Date>;
  $summary: Observable<Summary>;

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

    this.$summary = this.$selectedDate.pipe(
      switchMap((date) =>
        this.backendApiService.loadSummary(
          date.getFullYear(),
          // JS's getMonth is zero indexed :(
          date.getMonth() + 1,
        ),
      ),
    );
  }

  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;
  protected readonly faPlus = faPlus;
  protected readonly faWallet = faWallet;
  protected readonly faGear = faGear;
}
