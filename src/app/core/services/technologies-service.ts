import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Technology } from '../models/technology.model';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
   private http = inject(HttpClient);

  private technologies$ = this.http.get<Technology[]>('assets/data/technologies.json').pipe(shareReplay(1));

  getTechnologies() {
    return this.technologies$;
  }
}
