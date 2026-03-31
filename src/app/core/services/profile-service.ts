import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  private profile$ = this.http
  .get<Profile>('assets/data/profile.json')
  .pipe(shareReplay(1));

  // getProfile(){
  //   return this.profile$;
  // }

}
