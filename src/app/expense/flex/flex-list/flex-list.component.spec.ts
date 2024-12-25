import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexListComponent } from './flex-list.component';

describe('FlexListComponent', () => {
  let component: FlexListComponent;
  let fixture: ComponentFixture<FlexListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlexListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
