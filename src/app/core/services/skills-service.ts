import { inject, Injectable } from '@angular/core';
import { SiteService } from './site-service';
import { TechnologiesService } from './technologies-service';
import { combineLatest, map, shareReplay } from 'rxjs';
import { SkillGroupView } from '../models/skills';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private siteService = inject(SiteService);
  private technologiesService = inject(TechnologiesService);

  readonly skillGroups$ = combineLatest([
    this.siteService.getSite(),
    this.technologiesService.getTechnologies(),
  ]).pipe(
    map(([site, techs]): SkillGroupView[] => {
      const dict = new Map(techs.map((t) => [t.id, t]));
      return site.skills.map((group) => ({
        name: group.name,
        color: group.color,
        technologies: group.technologies
          .map((id) => dict.get(id))
          .filter((t): t is NonNullable<typeof t> => Boolean(t)),
      }));
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  getSkillGroups() {
    return this.skillGroups$;
  }
}
