/**
 * Generate a RFC4122 v4 UUID string in a safe, environment-agnostic way.
 */
export function randomUUID() {
    // Prefer native implementation when available
    if (typeof globalThis?.crypto?.randomUUID === 'function') {
        return globalThis.crypto.randomUUID();
    }
    // Fallback using getRandomValues when randomUUID is not present
    if (typeof globalThis?.crypto?.getRandomValues === 'function') {
        const bytes = new Uint8Array(16);
        globalThis.crypto.getRandomValues(bytes);
        // Per RFC4122 set version to 4 and variant bits
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        return `${hex.substr(0, 8)}-${hex.substr(8, 4)}-${hex.substr(12, 4)}-${hex.substr(16, 4)}-${hex.substr(20, 12)}`;
    }
    throw new Error('crypto.randomUUID and crypto.getRandomValues are not available in this environment');
}
//# sourceMappingURL=random_uuid.js.map