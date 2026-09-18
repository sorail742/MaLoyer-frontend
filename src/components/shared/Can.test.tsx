import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RoleProvider } from "@/lib/auth/role-context";
import { Can } from "./Can";

describe("Can", () => {
  it("affiche les enfants quand le rôle courant est autorisé", () => {
    render(
      <RoleProvider role="owner" userId="u1">
        <Can role={["owner", "manager"]}>
          <p>Contenu réservé</p>
        </Can>
      </RoleProvider>,
    );
    expect(screen.getByText("Contenu réservé")).toBeInTheDocument();
  });

  it("affiche le fallback quand le rôle courant n'est pas autorisé", () => {
    render(
      <RoleProvider role="tenant" userId="u1">
        <Can role={["owner", "manager"]} fallback={<p>Accès refusé</p>}>
          <p>Contenu réservé</p>
        </Can>
      </RoleProvider>,
    );
    expect(screen.queryByText("Contenu réservé")).not.toBeInTheDocument();
    expect(screen.getByText("Accès refusé")).toBeInTheDocument();
  });

  it("n'affiche rien sans rôle connu, même sans fallback explicite", () => {
    render(
      <RoleProvider role={undefined} userId={undefined}>
        <Can role={["owner"]}>
          <p>Contenu réservé</p>
        </Can>
      </RoleProvider>,
    );
    expect(screen.queryByText("Contenu réservé")).not.toBeInTheDocument();
  });
});
