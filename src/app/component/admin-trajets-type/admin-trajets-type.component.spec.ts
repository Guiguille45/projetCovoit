import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrajetsTypeComponent } from './admin-trajets-type.component';

describe('AdminTrajetsTypeComponent', () => {
  let component: AdminTrajetsTypeComponent;
  let fixture: ComponentFixture<AdminTrajetsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrajetsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrajetsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
