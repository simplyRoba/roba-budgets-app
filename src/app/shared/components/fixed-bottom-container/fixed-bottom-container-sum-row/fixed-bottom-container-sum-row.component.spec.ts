import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedBottomContainerSumRowComponent } from './fixed-bottom-container-sum-row.component';

describe('FixedBottomContainerSumRowComponent', () => {
  let component: FixedBottomContainerSumRowComponent;
  let fixture: ComponentFixture<FixedBottomContainerSumRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedBottomContainerSumRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedBottomContainerSumRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
