import { Injectable } from '@angular/core';
import * as CryptoTS from 'crypto-ts';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  key="AnilKABAR";


  constructor() { }

  encryption (data:any) {
    // Encrypt


    const ciphertext = CryptoTS.AES.encrypt(data, this.key);
    return ciphertext.toString();
  }

  decryption (data:any) {
    // Decrypt
    const bytes  = CryptoTS.AES.decrypt(data, this.key);
    const plaintext = bytes.toString(CryptoTS.enc.Utf8);
    return plaintext;
  }
}
