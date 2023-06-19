import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  userData$ = new BehaviorSubject<User>(new User());
  watchlistItemcount$ = new BehaviorSubject<number>(0);
  watchlistItem$ = new BehaviorSubject<Movie[]>([]);
}
