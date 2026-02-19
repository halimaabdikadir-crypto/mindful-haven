import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import FloatingHearts from "@/components/FloatingHearts";

const Auth = () => {
  const { login, signup } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Signup state
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginEmail || !loginPass) { setError("Please fill in all fields."); return; }
    const ok = login(loginEmail, loginPass);
    if (ok) navigate("/home");
    else setError("Account not found. Please sign up first.");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!name || !signupEmail || !signupPass || !confirmPass) { setError("Please fill in all fields."); return; }
    if (signupPass !== confirmPass) { setError("Passwords do not match."); return; }
    if (signupPass.length < 6) { setError("Password must be at least 6 characters."); return; }
    const ok = signup(name, signupEmail, signupPass);
    if (ok) navigate("/home");
    else setError("An account with this email already exists.");
  };

  const socialBtn = (icon: string, label: string) => (
    <button
      key={label}
      type="button"
      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-sm font-semibold text-foreground"
    >
      <span className="text-lg">{icon}</span> {label}
    </button>
  );

  return (
    <div className="min-h-screen hero-gradient flex flex-col items-center justify-center relative overflow-hidden px-4">
      <FloatingHearts />

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggle}
          className={`theme-toggle ${isDark ? "dark-active" : ""}`}
          aria-label="Toggle theme"
        >
          <div className="theme-toggle-thumb" />
        </button>
      </div>

      {/* Logo */}
      <div className="mb-8 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-5xl">🌿</span>
          <h1 className="text-5xl font-black text-primary tracking-wide" style={{ fontFamily: "Merienda, cursive" }}>
            ZEVINA
          </h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium">Your Academic Wellness Companion 💜</p>
      </div>

      {/* Card */}
      <div className="zevina-card w-full max-w-md p-8 relative z-10">
        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-border mb-6">
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); setSuccess(""); }}
              className={`flex-1 py-2.5 text-sm font-bold transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
              style={{ fontFamily: "Merienda, cursive" }}
            >
              {t === "login" ? "🔑 Login" : "✨ Sign Up"}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-primary/10 text-primary text-sm rounded-lg border border-primary/20">
            {success}
          </div>
        )}

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
              <input
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-xs text-primary hover:underline font-semibold">Forgot Password?</a>
            </div>
            <button type="submit" className="btn-primary w-full py-3 text-base">
              Login to ZEVINA
            </button>
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-2">
              {socialBtn("🔵", "Continue with Google")}
              {socialBtn("🍎", "Continue with Apple")}
              {socialBtn("📘", "Continue with Facebook")}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Don't have an account?{" "}
              <button type="button" onClick={() => setTab("signup")} className="text-primary font-bold hover:underline">
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
              <input
                type="password"
                value={signupPass}
                onChange={(e) => setSignupPass(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Repeat your password"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <button type="submit" className="btn-lavender w-full py-3 text-base">
              Create My Account ✨
            </button>
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium">or sign up with</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-2">
              {socialBtn("🔵", "Sign up with Google")}
              {socialBtn("🍎", "Sign up with Apple")}
              {socialBtn("📘", "Sign up with Facebook")}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Already have an account?{" "}
              <button type="button" onClick={() => setTab("login")} className="text-primary font-bold hover:underline">
                Login
              </button>
            </p>
          </form>
        )}
      </div>

      <p className="relative z-10 mt-6 text-xs text-muted-foreground text-center">
        🔒 Your data is safe with us. We respect your privacy.
      </p>
    </div>
  );
};

export default Auth;
