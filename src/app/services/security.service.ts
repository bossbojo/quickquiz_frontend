// Http service [ Created by Loem 21-04-2017 ]

import { Injectable } from '@angular/core';
declare let SecurityModel: Security;
@Injectable()
export class SecurityService implements Security {
    private KEY_SIZE = 1024;

    // generate public kay and private kay : สร้างคู่คีย์ public key และ private key
    GenerateKeyPair(): KeyPairModel {
        return SecurityModel.GenerateKeyPair(this.KEY_SIZE);
    }

    // Encryption from public key : เข้ารหัสข้อมูลจาก public key
    Encrypt(publicKey: string, plainText: string): string {
        return SecurityModel.Encrypt(publicKey, plainText);
    }

    // Decryption from private key : ถอดรหัสข้อมูลจาก private key
    Decrypt(privateKey: string, chiperText: string): string {
        return SecurityModel.Decrypt(privateKey, chiperText);
    }
}

export class KeyPairModel {
    publicKey: string;
    privateKey: string;
}

export interface Security {
    GenerateKeyPair: (keysize: number) => KeyPairModel;
    Encrypt: (publicKey: string, plainText: string) => string;
    Decrypt: (privateKey: string, chiperText: string) => string;
}