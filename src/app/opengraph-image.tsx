import { ImageResponse } from "next/og";

export const alt =
  "Kabir Bisanal - Software Developer Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, #5aa4f0 0%, #8bc7ff 58%, #73b94f 59%, #3d8f2c 100%)",
          fontFamily: "Arial",
          padding: "55px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#ece9d8",
            border: "3px solid #0054e3",
            boxShadow: "0 14px 35px rgba(0,0,0,0.35)",
          }}
        >
          {/* XP-style title bar */}
          <div
            style={{
              height: "70px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              background:
                "linear-gradient(180deg, #3b8cf5 0%, #0054e3 55%, #003399 100%)",
              color: "white",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            <div style={{ display: "flex" }}>
              Kabir&apos;s Portfolio
            </div>

            {/* Window controls */}
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              {/* Minimize */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: "7px",
                  border: "2px solid white",
                  background: "#2878dc",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "3px",
                    background: "white",
                    display: "flex",
                  }}
                />
              </div>

              {/* Maximize */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid white",
                  background: "#2878dc",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "14px",
                    border: "3px solid white",
                    display: "flex",
                  }}
                />
              </div>

              {/* Close */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid white",
                  background: "#e24b32",
                  color: "white",
                  fontSize: "25px",
                  fontWeight: 700,
                }}
              >
                x
              </div>
            </div>
          </div>

          {/* Main content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              padding: "58px 65px",
              alignItems: "center",
            }}
          >
            {/* Profile block */}
            <div
              style={{
                width: "190px",
                height: "190px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "55px",
                background:
                  "linear-gradient(135deg, #1e5da8 0%, #64a8e8 100%)",
                border: "8px solid white",
                outline: "2px solid #808080",
                color: "white",
                fontSize: "68px",
                fontWeight: 700,
              }}
            >
              KB
            </div>

            {/* Text content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#1a1a1a",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Welcome to my portfolio
              </div>

              <div
                style={{
                  fontSize: "64px",
                  color: "#1755a3",
                  marginBottom: "14px",
                }}
              >
                Kabir Bisanal
              </div>

              <div
                style={{
                  fontSize: "29px",
                  marginBottom: "27px",
                }}
              >
                Software Developer | Full-Stack & Data Science Projects
              </div>

              <div
                style={{
                  fontSize: "23px",
                  lineHeight: 1.45,
                  color: "#333",
                  maxWidth: "700px",
                }}
              >
                An interactive Windows XP-inspired portfolio showcasing
                software projects, development skills and technical work.
              </div>
            </div>
          </div>

          {/* XP-style status bar */}
          <div
            style={{
              height: "55px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 25px",
              borderTop: "2px solid #aaa",
              background: "#ece9d8",
              fontSize: "21px",
              color: "#333",
            }}
          >
            <div style={{ display: "flex" }}>
              Software Developer Portfolio
            </div>

            <div
              style={{
                display: "flex",
                fontWeight: 700,
                color: "#1755a3",
              }}
            >
              kabirbisanal.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}