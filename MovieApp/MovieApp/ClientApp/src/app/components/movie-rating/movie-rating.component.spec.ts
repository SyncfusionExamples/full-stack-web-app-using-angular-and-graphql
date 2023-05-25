import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRatingComponent } from './movie-rating.component';

describe('MovieRatingComponent', () => {
  let component: MovieRatingComponent;
  let fixture: ComponentFixture<MovieRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieRatingComponent]
    });
    fixture = TestBed.createComponent(MovieRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
