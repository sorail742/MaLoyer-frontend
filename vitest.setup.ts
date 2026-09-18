import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

/**
 * Nettoyage du DOM entre chaque test — Testing Library ne l'enregistre
 * pas automatiquement sous Vitest (contrairement à Jest, où l'auto-cleanup
 * s'accroche au framework détecté). Sans ça, un test qui rend un composant
 * laisse son DOM visible aux tests suivants du même fichier.
 */
afterEach(() => {
  cleanup();
});
