import { TestBed } from '@angular/core/testing';
import CryptoJS from 'crypto-js';

import { LocalStorageService } from './local.storage';
import { LocalStorageKey } from '../../../shared/enum/local-storage/localStorage';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const FAKE_ENCRYPTED = 'encrypted-value-mock';
  const FAKE_DECRYPTED = '{"name":"test"}';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    spyOn(localStorage, 'setItem').and.stub();
    spyOn(localStorage, 'getItem').and.returnValue(FAKE_ENCRYPTED);
    spyOn(localStorage, 'removeItem').and.stub();
    spyOn(localStorage, 'clear').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setItem', () => {
    it('should encrypt the value and call localStorage.setItem', () => {
      const encryptSpy = spyOn(CryptoJS.AES, 'encrypt').and.returnValue({
        toString: () => FAKE_ENCRYPTED,
      } as CryptoJS.lib.CipherParams);

      service.setItem(LocalStorageKey.TOKEN, { name: 'test' });

      expect(encryptSpy).toHaveBeenCalledWith(
        JSON.stringify({ name: 'test' }),
        jasmine.any(String),
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(LocalStorageKey.TOKEN, FAKE_ENCRYPTED);
    });

    it('should JSON.stringify the value before encrypting', () => {
      const encryptSpy = spyOn(CryptoJS.AES, 'encrypt').and.returnValue({
        toString: () => FAKE_ENCRYPTED,
      } as any);

      const data = [1, 2, 3];
      service.setItem(LocalStorageKey.USER, data);

      expect(encryptSpy).toHaveBeenCalledWith(JSON.stringify(data), jasmine.any(String));
    });

    it('should pass a non-empty string cryptoKey when encrypting', () => {
      const encryptSpy = spyOn(CryptoJS.AES, 'encrypt').and.returnValue({
        toString: () => FAKE_ENCRYPTED,
      } as any);

      service.setItem(LocalStorageKey.THEME, 'dark');

      const args = encryptSpy.calls.mostRecent().args;
      expect(args[1]).toBeTruthy();
    });
  });

  describe('getItem', () => {
    it('should return null when key does not exist in localStorage', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);

      const result = service.getItem(LocalStorageKey.TOKEN);

      expect(result).toBeNull();
    });

    it('should decrypt and parse the stored value', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(FAKE_ENCRYPTED);

      spyOn(CryptoJS.AES, 'decrypt').and.returnValue({
        toString: () => FAKE_DECRYPTED,
      } as CryptoJS.lib.WordArray);

      const result = service.getItem(LocalStorageKey.TOKEN);

      expect(CryptoJS.AES.decrypt).toHaveBeenCalledWith(FAKE_ENCRYPTED, jasmine.any(String));
      expect(result).toEqual({ name: 'test' });
    });

    it('should pass a non-empty cryptoKey when decrypting', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(FAKE_ENCRYPTED);

      const decryptSpy = spyOn(CryptoJS.AES, 'decrypt').and.returnValue({
        toString: () => FAKE_DECRYPTED,
      } as CryptoJS.lib.WordArray);

      service.getItem(LocalStorageKey.USER);

      const args = decryptSpy.calls.mostRecent().args;
      expect(args[1]).toBeTruthy();
    });
  });

  describe('removeItem', () => {
    it('should call localStorage.removeItem with the given key', () => {
      service.removeItem(LocalStorageKey.TOKEN);

      expect(localStorage.removeItem).toHaveBeenCalledWith(LocalStorageKey.TOKEN);
    });

    it('should call localStorage.removeItem exactly once', () => {
      service.removeItem(LocalStorageKey.USER);

      expect(localStorage.removeItem).toHaveBeenCalledOnceWith(LocalStorageKey.USER);
    });
  });

  describe('clear', () => {
    it('should call localStorage.clear', () => {
      service.clear();

      expect(localStorage.clear).toHaveBeenCalled();
    });

    it('should call localStorage.clear exactly once', () => {
      service.clear();

      expect(localStorage.clear).toHaveBeenCalledTimes(1);
    });
  });
});
