import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, ReplaySubject, switchMap, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/userType';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  readonly userType = UserType;
  readonly userData$ = this.subscriptionService.userData$;
  readonly watchlistItemcount$ = this.subscriptionService.watchlistItemcount$;
  private destroyed$ = new ReplaySubject<void>(1);

  public items: ItemModel[] = [
    {
      text: 'Logout',
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService,
    private readonly authService: AuthenticationService,
    private readonly watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.subscriptionService.userData$
      .pipe(
        switchMap((user: User) => {
          const userId = user.userId;
          if (userId > 0) {
            return this.watchlistService.getWatchlistItems(userId);
          } else {
            return EMPTY;
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        error: (error) => {
          console.error('Error ocurred while setting the Watchlist : ', error);
        },
      });
  }

  clickActionItem(args: MenuEventArgs) {
    if (args.item.text === 'Logout') {
      this.logout();
    }
  }

  private logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
