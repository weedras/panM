import Link from "next/link";

export default function Features() {
  return (
    <main style={{ minHeight: "100vh", padding: "64px" }}>
      <div className="hero-gradient" style={{ top: "10%" }}></div>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", marginBottom: "32px", display: "inline-block", fontSize: "14px" }}>
          &larr; Back home
        </Link>
        
        <h1 style={{ fontSize: "56px", marginBottom: "24px", letterSpacing: "-2px", lineHeight: 1.1 }}>
          Powerful Pangenome <br/>
          <span className="gradient-text">Exploration Tools</span>
        </h1>
        
        <p style={{ color: "var(--muted)", fontSize: "20px", maxWidth: "600px", marginBottom: "64px", lineHeight: 1.6 }}>
          Everything you need to analyze, visualize, and share your bacterial strain data in one unified platform.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div className="glass-panel" style={{ padding: "40px" }}>
            <div style={{ padding: "12px", background: "rgba(59,130,246,0.1)", color: "#93c5fd", borderRadius: "12px", display: "inline-block", marginBottom: "24px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>
            <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>Gene Clustering (panX)</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
              Our pipeline utilizes DIAMOND for rapid homology searches and MCL for robust orthologous gene clustering, processing dozens of strains in minutes.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "40px" }}>
            <div style={{ padding: "12px", background: "rgba(59,130,246,0.1)", color: "#93c5fd", borderRadius: "12px", display: "inline-block", marginBottom: "24px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>Interactive Phylogenetic Trees</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
              Visualize evolutionary relationships with fully interactive D3.js trees. Map gene gain/loss events directly onto ancestral nodes.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "40px" }}>
            <div style={{ padding: "12px", background: "rgba(59,130,246,0.1)", color: "#93c5fd", borderRadius: "12px", display: "inline-block", marginBottom: "24px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>Rich Metadata Integration</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
              Upload clinical or geographical metadata CSVs to color-code your phylogenetic trees and identify pathogenic outbreaks.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "40px" }}>
            <div style={{ padding: "12px", background: "rgba(59,130,246,0.1)", color: "#93c5fd", borderRadius: "12px", display: "inline-block", marginBottom: "24px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
            </div>
            <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>Sequence Alignments</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
              Dive deep into specific core genes with an embedded multiple sequence alignment (MSA) viewer displaying nucleotide polymorphisms.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
