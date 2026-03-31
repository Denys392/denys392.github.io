import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsService } from '../../../../core/services/projects-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-project-detail-page',
  imports: [RouterLink],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.css',
})
export class ProjectDetailPage {
private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);

  project = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => this.projectsService.bySlugView$(params.get('slug')!))
    ),
    { initialValue: undefined }
  );
}
