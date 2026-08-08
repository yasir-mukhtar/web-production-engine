/**
 * packages/core/lib/whatsapp.ts
 * The single place that builds wa.me hrefs. E.164 digits only: no "+",
 * no leading zero (08123… → 628123…). Message is URL-encoded.
 */
export function whatsappHref(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
