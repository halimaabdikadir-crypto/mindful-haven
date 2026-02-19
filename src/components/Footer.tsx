import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🌿</span>
              <span className="text-2xl font-black text-primary" style={{ fontFamily: "Merienda, cursive" }}>
                ZEVINA
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Supporting IB students through academic stress, one breath at a time. 💜
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3 mt-4">
              {[
                { icon: "📘", label: "Facebook", url: "#" },
                { icon: "📸", label: "Instagram", url: "#" },
                { icon: "🐦", label: "Twitter", url: "#" },
                { icon: "▶️", label: "YouTube", url: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-lg hover:bg-primary/20 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm" style={{ fontFamily: "Merienda, cursive" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/home", label: "Home" },
                { to: "/know-more", label: "Know More" },
                { to: "/forum", label: "Community Forum" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm" style={{ fontFamily: "Merienda, cursive" }}>
              Resources
            </h4>
            <ul className="space-y-2">
              {["Stress Management Guide", "Time Management Tips", "Breathing Exercises", "Mindfulness Toolkit"].map((r) => (
                <li key={r}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {r}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm" style={{ fontFamily: "Merienda, cursive" }}>
              Support & Info
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📧 hello@zevina.app</li>
              <li>🔒 Privacy Policy</li>
              <li>📜 Terms of Service</li>
              <li>❤️ For IB Students Worldwide</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2025 ZEVINA. Made with 💜 for every IB student who stayed up past midnight.
          </p>
          <p className="text-xs text-muted-foreground">
            🌿 Remember: Your worth is not your grade.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
