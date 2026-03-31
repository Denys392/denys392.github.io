import { Component, inject } from '@angular/core';
import { SiteService } from '../../../../core/services/site-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private siteService = inject(SiteService);

  site = toSignal(this.siteService.getSite());
}
