import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ExternalRoutes } from '../../shared/routes/external.routes';
import { InternalRoutes } from '../../shared/routes/internal.routes';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  protected readonly ExternalRoutes = ExternalRoutes;
  private readonly router = inject(Router);

  ngOnInit(): void {
    // Component initialized
  }

  protected externalRouterLink = ExternalRoutes;

  goToExternalRouter(route: ExternalRoutes) {
    this.router.navigate(['/', route]);
  }

  goToInternalRouter(route: InternalRoutes) {
    this.router.navigate(['/', route]);
  }
}
