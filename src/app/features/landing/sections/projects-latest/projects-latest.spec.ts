import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsLatest } from './projects-latest';

describe('ProjectsLatest', () => {
  let component: ProjectsLatest;
  let fixture: ComponentFixture<ProjectsLatest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsLatest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsLatest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
