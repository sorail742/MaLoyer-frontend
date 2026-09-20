/**
 * Devise unique de la plateforme — Franc Guinéen (ADR-0005 de ce dépôt,
 * miroir de `darmeuble-backend/docs/adr/0014-*.md`). Aucune conversion,
 * aucun support multi-devise.
 */
export const CURRENCY = "GNF";

/**
 * `Intl.NumberFormat` connaît déjà le nombre de décimales officiel du GNF
 * (0, comme les autres francs CFA/guinéens) — ne jamais forcer
 * `minimumFractionDigits`/`maximumFractionDigits` en dur ici.
 */
const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: CURRENCY,
});

export function formatGNF(amount: number): string {
  return formatter.format(amount);
}
