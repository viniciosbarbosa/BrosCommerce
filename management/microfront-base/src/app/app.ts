import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { AuthService } from './core/auth/auth.service';
import { HeaderOffline } from './shared/components/header-offline/header-offline';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, HeaderOffline],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Bros E-Commerce');
  protected readonly authService = inject(AuthService);
}
