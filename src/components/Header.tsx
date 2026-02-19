import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  transparent?: boolean;
}

const Header = ({ transparent = false }: HeaderProps) => {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/home", label: "Home", icon: "🏠" },
    { to: "/know-more", label: "Know More", icon: "📖" },
    { to: "/forum", label: "Community", icon: "💬" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${transparent ? "" : "glass-header"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 shrink-0">
          <span className="text-3xl">🌿</span>
          <span
            className="text-2xl font-black text-primary tracking-wide"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            ZEVINA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <span>{l.icon}</span> {l.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden sm:flex items-center bg-muted rounded-xl px-3 py-1.5 gap-2 text-sm text-muted-foreground">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-24 text-foreground placeholder:text-muted-foreground text-sm"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-xl hover:bg-muted transition-colors relative"
            >
              <span className="text-xl">🔔</span>
              <span className="notif-badge">3</span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-12 w-72 zevina-card p-4 z-50 bg-card border border-border">
                <h4 className="font-bold text-sm mb-3" style={{ fontFamily: "Merienda, cursive" }}>Notifications</h4>
                {["New reply in your forum post 💬", "Weekly reflection reminder 🌿", "Community tip shared ✨"].map((n, i) => (
                  <div key={i} className="py-2 border-b border-border last:border-0 text-sm text-foreground">
                    {n}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggle}
            className={`theme-toggle ${isDark ? "dark-active" : ""} hidden sm:block`}
            aria-label="Toggle theme"
          >
            <div className="theme-toggle-thumb" />
          </button>

          {/* Profile */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-sm font-bold cursor-pointer hover:bg-primary/20 transition-colors"
            onClick={handleLogout}
            title="Click to logout"
          >
            <span>👤</span>
            <span>{user?.name?.split(" ")[0] || "Me"}</span>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-foreground rounded transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-foreground rounded transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-foreground rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav md:hidden bg-card border-t border-border px-4 py-4 space-y-2 ${menuOpen ? "open" : "closed"}`}>
        {navLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <span>{l.icon}</span> {l.label}
          </Link>
        ))}
        <div className="flex items-center gap-3 px-4 pt-2">
          <span className="text-sm text-muted-foreground font-medium">{isDark ? "Dark mode" : "Light mode"}</span>
          <button onClick={toggle} className={`theme-toggle ${isDark ? "dark-active" : ""}`}>
            <div className="theme-toggle-thumb" />
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors"
        >
          🚪 Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
