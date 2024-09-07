import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedBottomButtonGroupComponent } from './fixed-bottom-button-group.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('FixedBottomButtonGroupComponent', () => {
  let component: FixedBottomButtonGroupComponent;
  let fixture: ComponentFixture<FixedBottomButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedBottomButtonGroupComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedBottomButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
