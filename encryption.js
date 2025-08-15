// encryption.js
export function caesarEncrypt(text, shift = 3) {
    return text.replace(/[a-z]/gi, char => {
        let base = char >= 'a' ? 97 : 65;
        return String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
    });
}

export function caesarDecrypt(text, shift = 3) {
    return caesarEncrypt(text, 26 - shift);
}
