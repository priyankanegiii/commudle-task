import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitpageComponent } from './gitpage.component';

describe('GitpageComponent', () => {
  let component: GitpageComponent;
  let fixture: ComponentFixture<GitpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
