import { Component } from '@angular/core';
import { DialogUtility } from '@syncfusion/ej2-angular-popups';
import { ReplaySubject, map, switchMap, takeUntil } from 'rxjs';
import { DeleteMovieService } from 'src/app/services/delete-movie.service';
import { FetchMovielistService } from 'src/app/services/fetch-movielist.service';
import { ToastUtility } from '@syncfusion/ej2-notifications';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.css'],
})
export class ManageMoviesComponent {
  public dialogObj: any;
  private destroyed$ = new ReplaySubject<void>(1);
  public initialPage = { pageSizes: true };
  public initialSort = {
    columns: [{ field: 'title', direction: 'Ascending' }],
  };
  public toolbarOptions?: ToolbarItems[];

  readonly movie$ = this.fetchMovielistService
    .watch()
    .valueChanges.pipe(map((result) => result.data));

  constructor(
    private readonly fetchMovielistService: FetchMovielistService,
    private readonly deleteMovieService: DeleteMovieService
  ) {
    this.toolbarOptions = ['Search'];
  }

  deleteConfirm(movieId: number): void {
    this.dialogObj = DialogUtility.confirm({
      title: 'Delete movie',
      content: 'Do you want to delete this Movie ?',
      width: '400px',
      okButton: { click: this.confirmOkAction.bind(this, movieId) },
      cancelButton: { click: this.confirmCancelAction.bind(this) },
    });
  }

  private confirmOkAction(movieId: number): void {
    this.deleteMovieService
      .mutate({
        movieId: movieId,
      })
      .pipe(
        switchMap(() => this.fetchMovielistService.watch().refetch()),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: () => {
          this.confirmCancelAction();
          ToastUtility.show({
            content: 'The movie is deleted successfully.',
            position: { X: 'Right', Y: 'Top' },
            cssClass: 'e-toast-success',
          });
        },
        error: () => {
          this.confirmCancelAction();
          ToastUtility.show({
            content: 'Error ocurred while deleting the movie data.',
            position: { X: 'Right', Y: 'Top' },
            cssClass: 'e-toast-danger',
          });
        },
      });
  }

  private confirmCancelAction(): void {
    this.dialogObj.hide();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
