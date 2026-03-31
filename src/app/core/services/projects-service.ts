import { inject, Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { TechnologiesService } from './technologies-service';
import { ProjectView } from '../models/project-view.model';
import { SiteService } from './site-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private http = inject(HttpClient);
  private technologiesService = inject(TechnologiesService);
  private siteService = inject(SiteService);

  readonly projects$ = this.http
    .get<Project[]>('assets/data/projects.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  readonly all$ = this.projects$.pipe(
    map((items) => [...items].sort((a, b) => (b.order ?? 0) - (a.order ?? 0))),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly projectsView$ = combineLatest([
    this.all$,
    this.technologiesService.getTechnologies(),
  ]).pipe(
    map(([projects, techs]): ProjectView[] => {
      const techMap = new Map(techs.map((t) => [t.id, t]));

      return projects.map((project) => ({
        ...project,
        technologiesFull: project.technologies
          .map((id) => techMap.get(id))
          .filter((t): t is NonNullable<typeof t> => Boolean(t)),
      }));
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly VisibleProjectsView$ = combineLatest([
    this.projectsView$,
    this.siteService.getSite(),
  ]).pipe(
    map(([projects, site]) => {
      const show = new Set(site.projectShow ?? []);
      const filtered = projects.filter((p) => show.has(p.slug));
      filtered.sort((a, b) => site.projectShow.indexOf(a.slug) - site.projectShow.indexOf(b.slug));
      return filtered;
    }),
  );

  featuredView$(limit = 6) {
    return this.projectsView$.pipe(map((items) => items.filter((p) => p.featured).slice(0, limit)));
  }

  bySlugView$(slug: string) {
    return this.projectsView$.pipe(map((items) => items.find((p) => p.slug === slug)));
  }
}
