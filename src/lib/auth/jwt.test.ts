import { describe, expect, it } from "vitest";
import { decoderPayloadUtile } from "./jwt";

function fabriquerJeton(payload: unknown): string {
  const segment = Buffer.from(JSON.stringify(payload))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `en-tete.${segment}.signature`;
}

describe("decoderPayloadUtile", () => {
  it("renvoie userId et role vides quand le jeton est absent", () => {
    expect(decoderPayloadUtile(undefined)).toEqual({
      userId: undefined,
      role: undefined,
    });
  });

  it("renvoie userId et role vides pour un jeton malformé", () => {
    expect(decoderPayloadUtile("pas-un-jwt")).toEqual({
      userId: undefined,
      role: undefined,
    });
  });

  it("décode sub et role depuis un payload valide", () => {
    const jeton = fabriquerJeton({
      sub: "user-1",
      sid: "session-1",
      role: "manager",
    });
    expect(decoderPayloadUtile(jeton)).toEqual({
      userId: "user-1",
      role: "manager",
    });
  });

  it("ignore un role qui ne fait pas partie de l'énumération connue", () => {
    const jeton = fabriquerJeton({ sub: "user-1", role: "root" });
    expect(decoderPayloadUtile(jeton)).toEqual({
      userId: "user-1",
      role: undefined,
    });
  });
});
