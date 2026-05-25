"use client";

import Link from "next/link";
import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main style={{ minHeight: "100vh", padding: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="hero-gradient" style={{ top: "10%" }}></div>
      
      <div className="glass-panel" style={{ width: "100%", maxWidth: "480px", padding: "48px" }}>
        <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", marginBottom: "32px", display: "inline-block", fontSize: "14px" }}>
          &larr; Back home
        </Link>
        
        <h2 style={{ fontSize: "32px", marginBottom: "8px", letterSpacing: "-1px" }}>
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "32px", fontSize: "14px" }}>
          {isLogin ? "Sign in to access your pangenome analyses." : "Sign up to start running cloud analyses."}
        </p>

        <form onSubmit={(e) => { e.preventDefault(); alert("Authentication endpoint not yet connected to database."); }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", outline: "none" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", outline: "none" }} 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }}>
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: "32px", textAlign: "center", fontSize: "14px", color: "var(--muted)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontWeight: 500, padding: 0 }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </main>
  );
}
