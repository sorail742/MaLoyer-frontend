import { describe, expect, it } from "vitest";
import { hasRole } from "./permissions";

describe("hasRole", () => {
  it("refuse tout rôle requis quand le rôle actuel est inconnu", () => {
    expect(hasRole(undefined, "owner")).toBe(false);
  });

  it("accepte en mode 'any' si le rôle actuel est dans la liste", () => {
    expect(hasRole("manager", ["owner", "manager"])).toBe(true);
  });

  it("refuse en mode 'any' si le rôle actuel n'est pas dans la liste", () => {
    expect(hasRole("tenant", ["owner", "manager"])).toBe(false);
  });

  it("en mode 'all', n'accepte qu'une liste à un seul rôle égal au rôle actuel", () => {
    expect(hasRole("owner", ["owner"], "all")).toBe(true);
    expect(hasRole("owner", ["owner", "manager"], "all")).toBe(false);
  });

  it("accepte toute liste vide (aucune restriction exprimée)", () => {
    expect(hasRole("tenant", [])).toBe(true);
  });
});
