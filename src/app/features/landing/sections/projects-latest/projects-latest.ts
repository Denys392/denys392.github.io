import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../../../core/services/projects-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectCard } from "../../../projects/components/project-card/project-card";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-projects-latest',
  imports: [CommonModule, RouterModule, ProjectCard],
  templateUrl: './projects-latest.html',
  styleUrl: './projects-latest.css',
})
export class ProjectsLatest {
  private projectsService = inject(ProjectsService);
  // projects = toSignal(this.projectsService.featuredView$(6), {initialValue: []});
  projects = toSignal(this.projectsService.VisibleProjectsView$, {initialValue: []});


}
