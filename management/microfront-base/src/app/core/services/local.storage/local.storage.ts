import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import CryptoJS from 'crypto-js';
import { LocalStorageKey } from '../../../shared/enum/local-storage/localStorage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly cryptoKey = environment.cryptoKey;

  public setItem(key: LocalStorageKey, value: any): void {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), this.cryptoKey).toString();
    localStorage.setItem(key, encryptedValue);
  }

  public getItem(key: LocalStorageKey): any {
    const encryptedValue = localStorage.getItem(key);

    if (!encryptedValue) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, this.cryptoKey);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

      return decryptedValue ? JSON.parse(decryptedValue) : null;
    } catch {
      return null;
    }
  }

  public removeItem(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
