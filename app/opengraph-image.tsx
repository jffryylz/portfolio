import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — IT & Web Development Portfolio`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(900px 500px at 78% 8%, rgba(34,211,238,0.20), transparent 60%), radial-gradient(700px 500px at 12% 92%, rgba(37,99,235,0.18), transparent 60%), #050505",
          color: "#ededf0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            color: "#22d3ee",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#22d3ee",
            }}
          />
          {site.badge}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 82, lineHeight: 1.02, letterSpacing: -2.5 }}>
            {site.headline}
          </div>
          <div style={{ fontSize: 30, color: "#8b8f9a", maxWidth: 900 }}>
            Projects, certifications, networking and technical skills.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", color: "#ededf0" }}>{site.name}</div>
          <div style={{ display: "flex", color: "#8b8f9a" }}>
            github.com/{site.github.username}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
