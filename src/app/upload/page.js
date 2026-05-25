"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleClickToUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSimulatedUpload = async (e) => {
    e.stopPropagation(); // Prevent opening file picker again when clicking upload button
    if (files.length === 0) return;
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address so we can send you the results.");
      return;
    }
    setIsUploading(true);
    setProgress(10);
    
    try {
      // 1. Get presigned URLs
      const filenames = files.map(f => f.name);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filenames })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get presigned URLs");
      setProgress(30);

      // 2. Upload directly to S3
      await Promise.all(
        data.urls.map(async (u) => {
          const file = files.find(f => f.name === u.filename);
          await fetch(u.url, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': 'application/octet-stream' }
          });
        })
      );
      setProgress(80);

      // 3. Queue the job
      const qRes = await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: data.jobId, email: email, files: data.urls.map(u => u.s3Key) })
      });
      
      if (!qRes.ok) throw new Error("Failed to queue job");
      setProgress(100);
      
      setTimeout(() => alert("Strains securely uploaded to AWS and queued! The local worker will process them shortly."), 500);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <main style={{ minHeight: "100vh", padding: "64px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", marginBottom: "32px", display: "inline-block" }}>
          &larr; Back to Dashboard
        </Link>
        
        <h1 style={{ fontSize: "48px", marginBottom: "16px", letterSpacing: "-1px" }}>Upload Strains</h1>
        <p style={{ color: "var(--muted)", marginBottom: "48px" }}>
          Drop your GenBank (.gbk) or FASTA files below. They will be securely uploaded to our cloud storage and queued for the panM pipeline.
        </p>

        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: "none" }} 
        />

        <div 
          className="glass-panel"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClickToUpload}
          style={{ 
            padding: "80px", 
            textAlign: "center", 
            border: isDragging ? "2px dashed var(--primary)" : "2px dashed rgba(255,255,255,0.2)",
            backgroundColor: isDragging ? "rgba(59, 130, 246, 0.05)" : "rgba(255,255,255,0.02)",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          {files.length > 0 ? (
            <div onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>{files.length} Strains Ready</h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" }}>
                {files.map((f, i) => (
                  <span key={i} style={{ padding: "4px 12px", background: "rgba(255,255,255,0.1)", borderRadius: "99px", fontSize: "12px" }}>
                    {f.name}
                  </span>
                ))}
              </div>
              <div style={{ marginBottom: "24px" }} onClick={(e) => e.stopPropagation()}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address (for results)"
                  disabled={isUploading}
                  style={{ width: "100%", maxWidth: "400px", padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", outline: "none", textAlign: "center" }}
                />
              </div>
              
              {!isUploading ? (
                <button onClick={handleSimulatedUpload} className="btn btn-primary">
                  Begin Pipeline Analysis
                </button>
              ) : (
                <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                    <span>Uploading & Queueing...</span>
                    <span>{progress}%</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "99px", overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: "var(--primary)", transition: "width 0.2s" }}></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <svg style={{ margin: "0 auto 24px auto", color: isDragging ? "var(--primary)" : "var(--muted)", transition: "color 0.2s" }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>Drag & Drop GenBank files here</h3>
              <p style={{ color: "var(--muted)" }}>or click to browse from your computer</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
