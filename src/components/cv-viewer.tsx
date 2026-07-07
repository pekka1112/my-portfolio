"use client";

import { useState } from "react";

const PDF_FILE = "/pdf_file/cv05.pdf";

export default function CVViewer() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <style>{`
        body {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cv-card { animation: fadeUp 0.45s ease both; }

        .cv-spinner {
          width: 40px; height: 40px;
          border: 3px solid #e5e7eb;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .cv-open-btn:hover {
          background: #f3f4f6 !important;
          color: #374151 !important;
        }
        .cv-dl-btn:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 20px rgba(99,102,241,0.4) !important;
        }
        .cv-dl-btn:active { transform: translateY(0) !important; }

        .cv-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
          transform: translateY(-3px) !important;
        }

        @media (max-width: 560px) {
          .cv-header-inner { padding: 12px 16px !important; }
          .cv-dl-btn span { display: none; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#ffffff",
          fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          width: "100vw",
        }}
      >
        {/* ── Header ── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e5e7eb",
        }}>
          <div
            className="cv-header-inner"
            style={{
              maxWidth: 900, margin: "0 auto",
              padding: "13px 32px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            {/* Title */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>📄</span>
              <div>
                <h1 style={{
                  fontSize: 16, fontWeight: 700, color: "#111827",
                  letterSpacing: "-0.2px", lineHeight: 1.2,
                }}>
                  Curriculum Vitae ( My CV )
                </h1>
                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>PDF</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <a
                href={PDF_FILE}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-open-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px",
                  background: "#f9fafb",
                  color: "#6b7280",
                  borderRadius: 8, fontSize: 12, fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid #e5e7eb",
                  transition: "all 0.18s ease",
                }}
              >
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Open
              </a>

              <a
                href={PDF_FILE}
                download="CV.pdf"
                className="cv-dl-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "8px 16px",
                  background: "#171717",
                  color: "#fff", borderRadius: 8,
                  fontSize: 12, fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                  boxShadow: "0 2px 10px rgba(99,102,241,0.3)",
                }}
              >
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Download this CV</span>
              </a>
            </div>
          </div>
        </header>

        {/* ── Main ── */}
        <main style={{
          padding: "40px 24px 64px",
          maxWidth: 900, margin: "0 auto",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          {/* Loading */}
          {!loaded && (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 14,
              padding: "80px 0",
              color: "#9ca3af", fontSize: 14,
            }}>
              <div className="cv-spinner" />
              <p>Loading CV...</p>
            </div>
          )}

          {/* PDF iframe */}
          <div
            className="cv-card"
            style={{
              display: loaded ? "block" : "none",
              borderRadius: 12, overflow: "hidden",
              boxShadow: "0 2px 16px rgba(0,0,0,0.08), 0 0 0 1px #e5e7eb",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              width: "100%", 
              // maxWidth: "100%",
            }}
          >
            <iframe
              src={`${PDF_FILE}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              style={{
                border: "none",
                display: "block",
                width: "100%",
                height: 2360,
                background: "#fff",
              }}
              onLoad={() => setLoaded(true)}
              title="Curriculum Vitae"
            />
          </div>
        </main>
      </div>
    </>
  );
}
