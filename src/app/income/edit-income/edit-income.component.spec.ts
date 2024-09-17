import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncomeComponent } from './edit-income.component';
import { BackendApiService } from '../../service/backend-api.service';
import { of } from 'rxjs';
import { Income } from '../../shared/income.model';
import { ActivatedRoute } from '@angular/router';

describe('EditIncomeComponent', () => {
  let component: EditIncomeComponent;
  let fixture: ComponentFixture<EditIncomeComponent>;

  beforeEach(async () => {
    const backendApiService: Partial<BackendApiService> = {
      loadIncome: (id) =>
        of({
          id: id,
          title: 'Test',
          amountInCents: 100,
          dueDate: new Date(),
        } satisfies Income),
    };

    await TestBed.configureTestingModule({
      imports: [EditIncomeComponent],
      providers: [
        {
          provide: BackendApiService,
          useValue: backendApiService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({ id: '123' }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
