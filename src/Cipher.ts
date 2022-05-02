import {
  InternalCipher,
  createInternalCipher,
} from './NativeFastCrypto/NativeFastCrypto';
import Stream from 'stream';
import { Buffer } from '@craftzdog/react-native-buffer';
import type { BinaryLike, Encoding } from './Utils';

class CipherCommon extends Stream.Transform {
  internalCipher: InternalCipher;

  CipherCommon() {
    this.internalCipher = createInternalCipher();
  }

  _transform(
    chunk: string | BinaryLike,
    encoding: Encoding,
    callback: () => void
  ) {
    this.update(chunk, encoding);
    callback();
  }

  _flush(callback: () => void) {
    this.push(this.final());
    callback();
  }

  update(data: BinaryLike);
  update(data: string, inputEncoding: Encoding): Buffer;
  update(
    data: ArrayBufferView,
    inputEncoding: undefined,
    outputEncoding: Encoding
  ): string;
  update(
    data: string,
    inputEncoding: Encoding | undefined,
    outputEncoding: Encoding
  ): string;
  update(
    data: string | ArrayBufferView | BinaryLike,
    inputEncoding?: Encoding,
    outputEncoding?: Encoding
  ) {

  }

  final(): Buffer;
  final(outputEncoding: BufferEncoding): string;
  final(arg: undefined | BufferEncoding): Buffer | string {}

  setAutoPadding(autoPadding?: boolean): this {
    this.internalCipher.setAutoPadding(!!autoPadding);
    return this;
  }

  protected setAAD(
    buffer: ArrayBufferView,
    options?: {
      plaintextLength: number;
    }
  ): this {
    this.internalCipher.setAAD(buffer.buffer, options?.plaintextLength);
    return this;
  }

  protected getAuthTag(): Buffer {
    return Buffer.from(this.internalCipher.getAuthTag());
  }
}

class Cipher extends CipherCommon {}

class CipherCCM extends Cipher {
  setAAD(
    buffer: ArrayBufferView,
    options: {
      plaintextLength: number;
    }
  ): this {
    super.setAAD(buffer, options);
    return this;
  }
  getAuthTag(): Buffer {
    return super.getAuthTag();
  }
}

class CipherGCM extends Cipher {
  setAAD(
    buffer: ArrayBufferView,
    options: {
      plaintextLength: number;
    }
  ): this {
    super.setAAD(buffer, options);
    return this;
  }
  getAuthTag(): Buffer {
    return super.getAuthTag();
  }
}

class CipherOCB extends Cipher {
  setAAD(
    buffer: ArrayBufferView,
    options: {
      plaintextLength: number;
    }
  ): this {
    super.setAAD(buffer, options);
    return this;
  }
  getAuthTag(): Buffer {
    return super.getAuthTag();
  }
}

class Decipher extends CipherCommon {}

class DecipherCCM extends Decipher {
  setAAD(
    buffer: ArrayBufferView,
    options: {
      plaintextLength: number;
    }
  ): this {
    super.setAAD(buffer, options);
    return this;
  }
  getAuthTag(): Buffer {
    return super.getAuthTag();
  }
}

class DecipherGCM extends Decipher {
  setAAD(
    buffer: ArrayBufferView,
    options: {
      plaintextLength: number;
    }
  ): this {
    super.setAAD(buffer, options);
    return this;
  }
  getAuthTag(): Buffer {
    return super.getAuthTag();
  }
}

class DecipherOCB extends Decipher {
  setAAD(
    buffer: ArrayBufferView,
    options: {
      plaintextLength: number;
    }
  ): this {
    super.setAAD(buffer, options);
    return this;
  }
  getAuthTag(): Buffer {
    return super.getAuthTag();
  }
}

export function createDecipher(algorithm: CipherCCMTypes, password: BinaryLike, options: CipherCCMOptions): DecipherCCM;
export function createDecipher(algorithm: CipherGCMTypes, password: BinaryLike, options?: CipherGCMOptions): DecipherGCM;
export function createDecipher(algorithm: string, password: BinaryLike, options?: stream.TransformOptions): Decipher;

export function createDecipheriv(algorithm: CipherCCMTypes, key: CipherKey, iv: BinaryLike, options: CipherCCMOptions): DecipherCCM;
export function createDecipheriv(algorithm: CipherOCBTypes, key: CipherKey, iv: BinaryLike, options: CipherOCBOptions): DecipherOCB;
export function createDecipheriv(algorithm: CipherGCMTypes, key: CipherKey, iv: BinaryLike, options?: CipherGCMOptions): DecipherGCM;
export function createDecipheriv(algorithm: string, key: CipherKey, iv: BinaryLike | null, options?: stream.TransformOptions): Decipher;

export function createCipher(algorithm: CipherCCMTypes, password: BinaryLike, options: CipherCCMOptions): CipherCCM;
export function createCipher(algorithm: CipherGCMTypes, password: BinaryLike, options?: CipherGCMOptions): CipherGCM;
export function createCipher(algorithm: string, password: BinaryLike, options?: stream.TransformOptions): Cipher;

export function createCipheriv(algorithm: CipherCCMTypes, key: CipherKey, iv: BinaryLike, options: CipherCCMOptions): CipherCCM;
export function createCipheriv(algorithm: CipherOCBTypes, key: CipherKey, iv: BinaryLike, options: CipherOCBOptions): CipherOCB;
export function createCipheriv(algorithm: CipherGCMTypes, key: CipherKey, iv: BinaryLike, options?: CipherGCMOptions): CipherGCM;
export function createCipheriv(algorithm: string, key: CipherKey, iv: BinaryLike | null, options?: stream.TransformOptions): Cipher;