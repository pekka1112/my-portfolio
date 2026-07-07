"use client";

import dynamic from "next/dynamic";

// Dynamically import the actual CV viewer with SSR disabled
const CVViewer = dynamic(() => import("../../components/cv-viewer"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 50%,#16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
        color: "rgba(255,255,255,0.5)",
        fontSize: 16,
        fontFamily: "Inter,-apple-system,sans-serif",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: "3px solid rgba(99,102,241,0.2)",
          borderTopColor: "#6366f1",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p>Đang tải CV...</p>
    </div>
  ),
});

export default function CVPage() {
  return <CVViewer />;
}
