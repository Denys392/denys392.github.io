import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../core/models/project.model';
import { ProjectView } from '../../../../core/models/project-view.model';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<ProjectView>();

  readonly maxTech = 6;

  readonly techs = computed(() => this.project().technologiesFull ?? []);

  readonly visibleTechs = computed(() => this.techs().slice(0, this.maxTech));

  readonly remainingTechCount = computed(() => this.techs().length - this.visibleTechs().length);
}
