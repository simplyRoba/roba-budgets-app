import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeListComponent } from './income-list.component';
import { BackendApiService } from '../../service/backend-api.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('IncomeListComponent', () => {
  let component: IncomeListComponent;
  let fixture: ComponentFixture<IncomeListComponent>;

  beforeEach(async () => {
    const backendApiService: Partial<BackendApiService> = {
      loadIncomeList: () => of([]),
    };

    await TestBed.configureTestingModule({
      imports: [IncomeListComponent],
      providers: [
        {
          provide: BackendApiService,
          useValue: backendApiService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
