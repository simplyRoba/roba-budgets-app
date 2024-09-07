import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedBottomButtonGroupComponent } from './fixed-bottom-button-group.component';

describe('DetailListButtonGroupComponent', () => {
  let component: FixedBottomButtonGroupComponent;
  let fixture: ComponentFixture<FixedBottomButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedBottomButtonGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedBottomButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
