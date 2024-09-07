import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { BackendApiService } from '../service/backend-api.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    const backendApiService: Partial<BackendApiService> = {
      loadSummary: (year, month) =>
        of({
          month: month,
          year: year,
          totalIncomeInCents: 0,
          totalFixExpensesInCents: 0,
          totalFlexExpensesInCents: 0,
        }),
    };

    await TestBed.configureTestingModule({
      imports: [SummaryComponent],
      providers: [
        {
          provide: BackendApiService,
          useValue: backendApiService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
