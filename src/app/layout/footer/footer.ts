import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/services/profile-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SiteService } from '../../core/services/site-service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private siteService = inject(SiteService);
  profile = toSignal(this.siteService.getSite());
  dateYear = new Date().getFullYear();
}
