import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ExternalRoutes } from '../../shared/routes/external.routes';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  protected readonly ExternalRoutes = ExternalRoutes;

  ngOnInit(): void {
    // Component initialized
  }
}
