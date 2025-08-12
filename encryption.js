const shift = 3; // Caesar cipher shift

export function encrypt(text) {
  if (!text) return '';
  return text.split('').map(char => {
    let code = char.charCodeAt(0);
    // Encrypt uppercase letters
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    }
    // Encrypt lowercase letters
    else if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    }
    return char; // Non-alphabet characters unchanged
  }).join('');
}

export function decrypt(text) {
  if (!text) return '';
  return text.split('').map(char => {
    let code = char.charCodeAt(0);
    // Decrypt uppercase letters
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
    }
    // Decrypt lowercase letters
    else if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
    }
    return char;
  }).join('');
}
