import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../../core/services/profile-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SiteService } from '../../../../core/services/site-service';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private siteService = inject(SiteService);
  profile = toSignal(this.siteService.getSite());
}
