import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SiteData } from '../models/site.model';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  private http = inject(HttpClient);

  private site$ = this.http
    .get<SiteData>('assets/data/site.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getSite() {
    return this.site$;
  }
}
