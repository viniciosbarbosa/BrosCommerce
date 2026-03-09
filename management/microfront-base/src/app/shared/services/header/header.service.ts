import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public readonly isMenuOpen = signal(false);

  public toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }

  public setMenuOpen(val: boolean) {
    this.isMenuOpen.set(val);
  }
}
