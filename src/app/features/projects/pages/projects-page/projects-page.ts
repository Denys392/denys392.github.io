import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../../../core/services/projects-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectCard } from "../../components/project-card/project-card";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectCard],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {
 private projectsService = inject(ProjectsService);
 projects = toSignal(this.projectsService.projectsView$, { initialValue: [] });
}
