/**
 * SanitizerService
 * Enforces strictly plaintext, emoji-free formatting across all notification dispatches,
 * audit logs, AI agent generation, and outbound communication channels.
 */
export class SanitizerService {
  private static readonly EMOJI_REGEX = /(\p{Extended_Pictographic}\uFE0F?|[\u{1F000}-\u{1FAFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}])\s?/gu;

  /**
   * Strips all unicode emojis, pictographs, and variation selectors from a string.
   */
  public static removeEmojis(text: string): string {
    if (!text || typeof text !== 'string') return text;
    return text.replace(this.EMOJI_REGEX, '').trim();
  }

  /**
   * Recursively sanitizes any payload (objects, arrays, strings) to guarantee zero emojis.
   */
  public static sanitizePayload<T>(payload: T): T {
    if (!payload) return payload;
    if (typeof payload === 'string') {
      return this.removeEmojis(payload) as unknown as T;
    }
    if (Array.isArray(payload)) {
      return payload.map(item => this.sanitizePayload(item)) as unknown as T;
    }
    if (typeof payload === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(payload)) {
        sanitized[key] = this.sanitizePayload(value);
      }
      return sanitized;
    }
    return payload;
  }
}
