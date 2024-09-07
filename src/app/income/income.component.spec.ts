import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { BackendApiService } from '../service/backend-api.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('IncomeComponent', () => {
  let component: IncomeComponent;
  let fixture: ComponentFixture<IncomeComponent>;

  beforeEach(async () => {
    const backendApiService: Partial<BackendApiService> = {
      loadIncomeList: () => of([]),
    };

    await TestBed.configureTestingModule({
      imports: [IncomeComponent],
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

    fixture = TestBed.createComponent(IncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
