import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Africa/Conakry = UTC+0 toute l'année (pas d'heure d'été) — voir
 * `darmeuble-backend/docs/adr/0014-*.md`. Les dates arrivent du backend en
 * UTC (ISO 8601) ; comme Conakry coïncide avec UTC, aucune conversion de
 * fuseau n'est appliquée ici. Ne pas en déduire qu'aucun fuseau ne se
 * posera jamais si la plateforme s'étend hors Guinée.
 */
export function formatDateGN(
  date: Date | string,
  pattern = "dd/MM/yyyy",
): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return format(value, pattern, { locale: fr });
}

export function formatRelativeGN(date: Date | string): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(value, { locale: fr, addSuffix: true });
}
