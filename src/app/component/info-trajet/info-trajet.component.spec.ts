import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTrajetComponent } from './info-trajet.component';

describe('InfoTrajetComponent', () => {
  let component: InfoTrajetComponent;
  let fixture: ComponentFixture<InfoTrajetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTrajetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
