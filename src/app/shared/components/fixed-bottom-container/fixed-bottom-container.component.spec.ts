import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedBottomContainerComponent } from './fixed-bottom-container.component';

describe('FixedBottomContainerComponent', () => {
  let component: FixedBottomContainerComponent;
  let fixture: ComponentFixture<FixedBottomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedBottomContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedBottomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
