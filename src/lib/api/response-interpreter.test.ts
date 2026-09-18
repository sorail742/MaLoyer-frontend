import { describe, expect, it } from "vitest";
import { interpreterReponse } from "./response-interpreter";
import { ApiError } from "./types";

describe("interpreterReponse", () => {
  it("renvoie l'enveloppe telle quelle pour un statut 2xx", () => {
    const enveloppe = { success: true, data: { id: "1" }, meta: {} };
    expect(interpreterReponse(200, enveloppe, "/api/x")).toEqual(enveloppe);
  });

  it("lève une ApiError construite depuis error.* pour un statut d'erreur", () => {
    const corps = {
      success: false,
      error: {
        statusCode: 401,
        message: "Identifiants invalides",
        error: "Unauthorized",
        path: "/api/auth/login",
        timestamp: "2026-01-01T00:00:00.000Z",
      },
    };
    expect(() => interpreterReponse(401, corps, "/api/auth/login")).toThrow(
      ApiError,
    );
    try {
      interpreterReponse(401, corps, "/api/auth/login");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).message).toBe("Identifiants invalides");
      expect((error as ApiError).statusCode).toBe(401);
    }
  });

  it("construit une erreur générique quand le corps n'a pas la forme attendue", () => {
    expect(() =>
      interpreterReponse(502, null, "/api/x", "Bad Gateway"),
    ).toThrow(ApiError);
  });

  it("expose fieldErrors quand message est un tableau (validation)", () => {
    const corps = {
      success: false,
      error: {
        statusCode: 400,
        message: ["email doit être un email valide"],
        error: "BadRequest",
        path: "/api/auth/register",
        timestamp: "2026-01-01T00:00:00.000Z",
      },
    };
    try {
      interpreterReponse(400, corps, "/api/auth/register");
    } catch (error) {
      expect((error as ApiError).fieldErrors).toEqual([
        "email doit être un email valide",
      ]);
    }
  });
});
