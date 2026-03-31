import { Component, inject } from '@angular/core';
import { SiteService } from '../../../../core/services/site-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TechnologiesService } from '../../../../core/services/technologies-service';
import { SkillsService } from '../../../../core/services/skills-service';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  private skillsService = inject(SkillsService);

  groups = toSignal(this.skillsService.getSkillGroups(), { initialValue: [] });
}
