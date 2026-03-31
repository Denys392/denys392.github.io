import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/pages/projects-page/projects-page').then((m) => m.ProjectsPage),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/projects/pages/project-detail-page/project-detail-page').then(
        (m) => m.ProjectDetailPage,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found')
        .then(m => m.NotFound),
  }
];
