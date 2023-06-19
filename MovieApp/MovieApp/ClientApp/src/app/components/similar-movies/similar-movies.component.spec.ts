import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarMoviesComponent } from './similar-movies.component';

describe('SimilarMoviesComponent', () => {
  let component: SimilarMoviesComponent;
  let fixture: ComponentFixture<SimilarMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarMoviesComponent]
    });
    fixture = TestBed.createComponent(SimilarMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
