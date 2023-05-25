import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMovieComponent } from './delete-movie.component';

describe('DeleteMovieComponent', () => {
  let component: DeleteMovieComponent;
  let fixture: ComponentFixture<DeleteMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMovieComponent]
    });
    fixture = TestBed.createComponent(DeleteMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
