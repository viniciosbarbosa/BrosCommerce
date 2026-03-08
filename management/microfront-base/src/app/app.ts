import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { AuthService } from './core/auth/auth.service';
import { HeaderMobile } from './shared/components/header-mobile/header-mobile';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, HeaderMobile, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Bros E-Commerce');
  protected readonly authService = inject(AuthService);

  isLogged = computed(() => this.authService.isAuthenticated);
}
