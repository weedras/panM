import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div className="hero-gradient"></div>

      <nav style={{ padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: "24px", letterSpacing: "-0.5px" }}>
          pan<span className="gradient-text">M</span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center", fontSize: "14px", color: "var(--muted)" }}>
          <Link href="/features" className="nav-link">Features</Link>
          <Link href="/docs" className="nav-link">Documentation</Link>
          <Link href="/auth" className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: "14px" }}>Sign In</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        <div style={{ padding: "6px 16px", borderRadius: "99px", border: "1px solid rgba(59,130,246,0.3)", backgroundColor: "rgba(59,130,246,0.1)", color: "#93c5fd", fontSize: "14px", fontWeight: 500, marginBottom: "32px", display: "inline-block" }}>
          🚀 Version 1.0 is now live
        </div>

        <h1 style={{ fontSize: "72px", lineHeight: 1.1, letterSpacing: "-2px", marginBottom: "24px", maxWidth: "900px" }}>
          Next-Generation <br />
          <span className="gradient-text">Pangenome Analysis</span>
        </h1>
        
        <p style={{ fontSize: "20px", color: "var(--muted)", maxWidth: "600px", marginBottom: "48px", lineHeight: 1.6 }}>
          Upload your GenBank files or select public strains to automatically cluster genes, compute sequence alignments, and generate interactive phylogenetic trees in the cloud.
        </p>

        <div style={{ display: "flex", gap: "16px" }}>
          <Link href="/upload" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16px" }}>
            Start Analysis
            <svg style={{ marginLeft: "8px" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/klebsiella_20.html" className="btn btn-secondary" style={{ padding: "16px 32px", fontSize: "16px" }}>
            View Demo Dataset
          </Link>
        </div>

        <div className="glass-panel" style={{ marginTop: "80px", width: "100%", padding: "40px", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          <div>
            <h3 style={{ fontSize: "36px", marginBottom: "8px", fontFamily: "var(--font-inter)", letterSpacing: "-1px" }}>36k+</h3>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>Gene Clusters Computed</p>
          </div>
          <div>
            <h3 style={{ fontSize: "36px", marginBottom: "8px", fontFamily: "var(--font-inter)", letterSpacing: "-1px" }}>100x</h3>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>Faster than Local</p>
          </div>
          <div>
            <h3 style={{ fontSize: "36px", marginBottom: "8px", fontFamily: "var(--font-inter)", letterSpacing: "-1px" }}>21+</h3>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>Strains Supported</p>
          </div>
        </div>

      </div>
    </main>
  );
}
