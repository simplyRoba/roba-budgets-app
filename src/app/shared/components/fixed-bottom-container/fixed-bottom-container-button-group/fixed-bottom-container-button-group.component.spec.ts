import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedBottomContainerButtonGroupComponent } from './fixed-bottom-container-button-group.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('FixedBottomButtonGroupComponent', () => {
  let component: FixedBottomContainerButtonGroupComponent;
  let fixture: ComponentFixture<FixedBottomContainerButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedBottomContainerButtonGroupComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedBottomContainerButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
