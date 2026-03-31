import { Component, inject } from '@angular/core';
import { Nav } from "../nav/nav";
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/services/profile-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SiteService } from '../../core/services/site-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,Nav],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private siteService = inject(SiteService);
  profile = toSignal(this.siteService.getSite());

}
