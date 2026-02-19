import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingHearts from "@/components/FloatingHearts";
import Chatbot from "@/components/Chatbot";

const techniques = [
  {
    id: "stress",
    icon: "🧘",
    title: "Stress Management",
    color: "border-primary/30 bg-primary/5",
    accent: "text-primary",
    tips: [
      "Practice the 4-7-8 breathing: inhale 4 counts, hold 7, exhale 8",
      "Progressive muscle relaxation — tense and release each muscle group",
      "Take 5-minute movement breaks every hour of study",
      "Write down your top 3 worries and close the notebook — then study",
      "Use the 5-4-3-2-1 grounding technique when anxiety spikes",
    ],
  },
  {
    id: "time",
    icon: "⏰",
    title: "Time Management",
    color: "border-secondary bg-secondary/30",
    accent: "text-secondary-foreground",
    tips: [
      "Use the Pomodoro technique: 25 min focus, 5 min break",
      "Plan your week every Sunday — list all deadlines and commitments",
      "Break IAs and EE into daily micro-tasks instead of big sessions",
      "Use time blocking: assign each subject to specific daily slots",
      "Apply the 2-minute rule: if it takes less than 2 min, do it now",
    ],
  },
  {
    id: "emotional",
    icon: "💚",
    title: "Emotional Wellbeing",
    color: "border-accent bg-accent/40",
    accent: "text-accent-foreground",
    tips: [
      "Journal for 10 minutes daily — write without editing yourself",
      "Practice self-compassion: talk to yourself like a friend would",
      "Identify your emotional triggers and create a personal coping plan",
      "Limit doomscrolling — set screen time limits on social media",
      "Connect with a trusted friend, teacher, or counselor regularly",
    ],
  },
  {
    id: "motivation",
    icon: "🌟",
    title: "Motivation & Encouragement",
    color: "border-primary/30 bg-primary/5",
    accent: "text-primary",
    tips: [
      "Celebrate small wins — finishing a paragraph counts!",
      "Create a vision board with your post-IB goals and dreams",
      "Remind yourself WHY you chose IB — reconnect with your purpose",
      "Find an accountability buddy who checks in on your progress",
      "Read success stories from IB alumni to see what's possible",
    ],
  },
];

const faqs = [
  { q: "Is it normal to feel burned out during the IB programme?", a: "Absolutely. IB is one of the most demanding academic programmes in the world. Burnout is extremely common among DP students, especially in DP2. Feeling burned out doesn't mean you're failing — it means you're human. Use ZEVINA's tools to recover and pace yourself." },
  { q: "How do I manage TOK, EE, and IAs all at once?", a: "Break each into phases: research, outline, first draft, revision. Set mini-deadlines 1-2 weeks before real deadlines. Prioritize whichever is due first and avoid switching between big tasks on the same day." },
  { q: "What if my stress is affecting my grades?", a: "Talk to your IB coordinator or school counselor — they have accommodations available. Seek support early. Consider speaking to a professional if stress is persistent. ZEVINA supports you but doesn't replace professional help." },
  { q: "How can I improve my sleep during exam season?", a: "Set a consistent sleep time even on weekends. Create a wind-down routine (no screens 1 hour before bed). Write tomorrow's to-do list before sleeping — this offloads mental load. Aim for 7-9 hours minimum." },
  { q: "Can mindfulness really help with academic stress?", a: "Yes! Research shows even 5-10 minutes of daily mindfulness significantly reduces cortisol (stress hormone) levels. Try body scans, breathing exercises, or gratitude journaling. Consistency matters more than duration." },
];

const downloadResources = [
  { name: "IB Study Planner Template", icon: "📅", size: "PDF · 2.1 MB" },
  { name: "Stress Relief Toolkit", icon: "🌿", size: "PDF · 1.8 MB" },
  { name: "Mindfulness for Students", icon: "🧘", size: "PDF · 3.4 MB" },
  { name: "EE & IA Breakdown Guide", icon: "📖", size: "PDF · 2.9 MB" },
];

const KnowMore = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      <Header />
      <Chatbot />

      {/* Hero */}
      <section className="hero-gradient pt-28 pb-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-5xl block mb-4">🌿</span>
          <h1 className="text-foreground mb-4">Stress Relief Hub</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Practical, science-backed strategies designed specifically for IB students managing heavy workloads, overlapping deadlines, and emotional exhaustion.
          </p>
        </div>
      </section>

      {/* Techniques Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techniques.map((t) => (
            <div key={t.id} className={`zevina-card p-7 border ${t.color}`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">{t.icon}</span>
                <h2 className={`${t.accent}`}>{t.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-primary mt-0.5 shrink-0">✓</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Breathing Exercise Video Placeholder */}
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-foreground mb-3">🎵 Guided Exercises</h2>
          <p className="text-muted-foreground">Take a break right now with these calming exercises.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="zevina-card p-6 border border-border text-center">
            <div className="w-full h-40 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-5xl">
              🎵
            </div>
            <h3 className="text-foreground mb-1">5-Min Breathing Exercise</h3>
            <p className="text-muted-foreground text-sm mb-4">Box breathing to calm your nervous system</p>
            <button className="btn-primary px-6 py-2 text-sm">▶ Play Audio</button>
          </div>
          <div className="zevina-card p-6 border border-border text-center">
            <div className="w-full h-40 bg-secondary/40 rounded-xl flex items-center justify-center mb-4 text-5xl">
              🎬
            </div>
            <h3 className="text-foreground mb-1">Body Scan Meditation</h3>
            <p className="text-muted-foreground text-sm mb-4">10-minute guided meditation for stress relief</p>
            <button className="btn-lavender px-6 py-2 text-sm">▶ Watch Video</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-foreground mb-3">❓ Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Common questions from IB students like you.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="zevina-card border border-border overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-foreground text-sm leading-snug">{f.q}</span>
                <span className={`text-primary text-lg transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border pt-3" style={{ animation: "fadeIn 0.3s ease" }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Downloads */}
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h2 className="text-foreground mb-3">📥 Free Downloads</h2>
          <p className="text-muted-foreground">Tools and guides to keep you organized and calm.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {downloadResources.map((r) => (
            <div key={r.name} className="zevina-card p-5 border border-border text-center cursor-pointer hover:border-primary/40">
              <span className="text-4xl block mb-3">{r.icon}</span>
              <p className="font-semibold text-foreground text-sm mb-1">{r.name}</p>
              <p className="text-xs text-muted-foreground mb-4">{r.size}</p>
              <button className="btn-lavender px-4 py-1.5 text-xs w-full">⬇ Download</button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KnowMore;
