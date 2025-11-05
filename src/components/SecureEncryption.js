// SecureEncryption.js
import CryptoJS from 'crypto-js';
import forge from 'node-forge';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

/* ================= AES-256 ================= */
export const aes256Encrypt = (text, userKey) => {
  const key = CryptoJS.SHA256(userKey); // derive 256-bit key from user key
  const iv = CryptoJS.enc.Utf8.parse('initialvector123');
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv }).toString();
  return encrypted;
};

export const aes256Decrypt = (cipher, userKey) => {
  const key = CryptoJS.SHA256(userKey);
  const iv = CryptoJS.enc.Utf8.parse('initialvector123');
  const decrypted = CryptoJS.AES.decrypt(cipher, key, { iv }).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

/* ================= RSA-2048 ================= */
export const rsaEncrypt = (text, userKey) => {
  // generate new 2048-bit keypair for this session
  const keypair = forge.pki.rsa.generateKeyPair(2048);

  // save private key in localStorage temporarily (simulate user session)
  localStorage.setItem('rsa_private_' + userKey, forge.pki.privateKeyToPem(keypair.privateKey));

  const encrypted = forge.util.encode64(keypair.publicKey.encrypt(text));
  return encrypted;
};

export const rsaDecrypt = (cipher, userKey) => {
  const privatePem = localStorage.getItem('rsa_private_' + userKey);
  if (!privatePem) return 'Private key not found!';
  const privateKey = forge.pki.privateKeyFromPem(privatePem);
  return privateKey.decrypt(forge.util.decode64(cipher));
};

/* ================= Blowfish ================= */
export const blowfishEncrypt = (text, userKey) => {
  const key = CryptoJS.SHA256(userKey).toString(CryptoJS.enc.Hex);
  const encrypted = CryptoJS.Blowfish.encrypt(text, key).toString();
  return encrypted;
};

export const blowfishDecrypt = (cipher, userKey) => {
  const key = CryptoJS.SHA256(userKey).toString(CryptoJS.enc.Hex);
  const decrypted = CryptoJS.Blowfish.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

/* ================= Triple DES ================= */
export const tripleDESEncrypt = (text, userKey) => {
  const key = CryptoJS.MD5(userKey); // generate shorter key for 3DES
  const encrypted = CryptoJS.TripleDES.encrypt(text, key).toString();
  return encrypted;
};

export const tripleDESDecrypt = (cipher, userKey) => {
  const key = CryptoJS.MD5(userKey);
  const decrypted = CryptoJS.TripleDES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

/* ================= ChaCha20 ================= */
export const chacha20Encrypt = (text, userKey) => {
  const hash = CryptoJS.SHA256(userKey).toString(CryptoJS.enc.Hex);
  const key = new Uint8Array(hash.match(/.{2}/g).map(b => parseInt(b, 16)));

  const nonce = nacl.randomBytes(24);
  const message = naclUtil.decodeUTF8(text);
  const encrypted = nacl.secretbox(message, nonce, key);

  return JSON.stringify({
    nonce: naclUtil.encodeBase64(nonce),
    data: naclUtil.encodeBase64(encrypted)
  });
};

export const chacha20Decrypt = (payloadStr, userKey) => {
  try {
    const payload = JSON.parse(payloadStr);
    const hash = CryptoJS.SHA256(userKey).toString(CryptoJS.enc.Hex);
    const key = new Uint8Array(hash.match(/.{2}/g).map(b => parseInt(b, 16)));
    const nonce = naclUtil.decodeBase64(payload.nonce);
    const data = naclUtil.decodeBase64(payload.data);
    const decrypted = nacl.secretbox.open(data, nonce, key);
    if (!decrypted) return 'Decryption failed';
    return naclUtil.encodeUTF8(decrypted);
  } catch {
    return 'Invalid encrypted payload';
  }
};

/* ================= Unified Interface ================= */
export const encryptData = (text, algo, userKey) => {
  switch (algo) {
    case 'AES-256': return aes256Encrypt(text, userKey);
    case 'RSA-2048': return rsaEncrypt(text, userKey);
    case 'Blowfish': return blowfishEncrypt(text, userKey);
    case 'Triple DES': return tripleDESEncrypt(text, userKey);
    case 'ChaCha20': return chacha20Encrypt(text, userKey);
    default: return btoa(text);
  }
};

export const decryptData = (cipher, algo, userKey) => {
  switch (algo) {
    case 'AES-256': return aes256Decrypt(cipher, userKey);
    case 'RSA-2048': return rsaDecrypt(cipher, userKey);
    case 'Blowfish': return blowfishDecrypt(cipher, userKey);
    case 'Triple DES': return tripleDESDecrypt(cipher, userKey);
    case 'ChaCha20': return chacha20Decrypt(cipher, userKey);
    default: return atob(cipher);
  }
};
